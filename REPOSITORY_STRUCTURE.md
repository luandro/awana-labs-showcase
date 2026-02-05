# PRD - Codebase Analysis & Refactoring Plan

## Core Findings

### Routing & Page Composition

#### Current Structure

- **Router**: HashRouter from react-router-dom (`src/App.tsx:5-22`)
- **Routes**: Only 2 routes - `/` (Index) and `*` (NotFound catch-all)
- **Pages**: `src/pages/Index.tsx`, `src/pages/NotFound.tsx`

#### Page Composition Issues

##### 1. Data Fetching in Page Component (Index.tsx:7-27)

**Issue**: Index page directly fetches data using raw fetch API with useEffect.

```typescript
// src/pages/Index.tsx:11-27
useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}projects.json`);
      const data: ProjectsData = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchProjects();
}, []);
```

**Problems**:

- No separation between data fetching and presentation
- No loading state management strategy
- Error handling just logs to console
- No retry mechanism or error boundaries
- Direct coupling to static JSON file location

**Suggested Fix**:

- Create `src/hooks/useProjects.ts` to encapsulate data fetching
- Add error boundary component
- Use React Query (already installed) for caching, retries, and loading states
- Extract fetch logic to `src/lib/api/projects.ts`

---

##### 2. Duplicated Status Color Logic

**Issue**: Status color mappings defined in 2 separate files with identical logic.

**Locations**:

- `src/components/ProjectCard.tsx:12-16`
- `src/components/ProjectModal.tsx:14-18`

```typescript
// Duplicated in both files
const statusColors = {
  active: "bg-green-500/10 text-green-700 border-green-500/20",
  paused: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  archived: "bg-muted text-muted-foreground border-border",
};
```

**Suggested Fix**:

- Extract to `src/lib/constants/statusColors.ts` or `src/lib/project-helpers.ts`
- Create a helper function: `getStatusColorClasses(status: ProjectStatus['state'])`

---

##### 3. Duplicated Usage Label Logic

**Issue**: Usage label mappings defined identically in 2 files.

**Locations**:

- `src/components/ProjectCard.tsx:18-22`
- `src/components/ProjectModal.tsx:20-24`

```typescript
// Duplicated in both files
const usageLabels = {
  experimental: "Experimental",
  used: "In Use",
  "widely-used": "Widely Used",
};
```

**Suggested Fix**:

- Extract to `src/lib/constants/usageLabels.ts` or `src/lib/project-helpers.ts`
- Create a helper function: `getUsageLabel(usage: ProjectStatus['usage'])`

---

##### 4. Navigation Component Not Used

**Issue**: `src/components/NavLink.tsx` exists but is not used anywhere in the codebase.

**Analysis**:

- Component provides wrapper around react-router-dom's NavLink
- Adds className compatibility layer
- No navigation menu or header component exists
- Hero scroll behavior uses direct DOM manipulation (`scrollIntoView`)

**Problems**:

- Dead code adds maintenance burden
- No actual navigation between pages (only 1 real page exists)
- Scroll navigation in Hero is manual DOM manipulation

**Suggested Fix**:

- Either use NavLink for actual navigation or remove it
- If keeping: create a proper Header/Nav component
- Consider scroll-based navigation as a separate concern

---

##### 5. Motion Variants Repeated

**Issue**: Similar motion animation variants defined across multiple components.

**Locations**:

- `src/components/Hero.tsx:8-26`
- `src/components/ProjectsGallery.tsx:49-57`
- `src/components/ProjectCard.tsx:27-43`
- `src/components/ProjectModal.tsx:68-91`

**Problems**:

- Each component defines its own variants with similar patterns
- `useReducedMotion` hook repeated in each component
- No shared animation library or constants

**Suggested Fix**:

- Create `src/lib/animations/variants.ts` for common motion patterns
- Create wrapper components for common animated containers
- Extract reduced motion logic to a custom hook or context

---

##### 6. Inconsistent Error Handling

**Issue**: Error handling patterns vary across components.

**Examples**:

- Index page: `console.error("Failed to load projects:", error)` - only logs
- NotFound page: `console.error("404 Error: ...", location.pathname)` - only logs
- No error boundaries or user-facing error messages

**Suggested Fix**:

- Create `src/components/ErrorBoundary.tsx`
- Add toast notifications for errors (using existing Sonner toaster)
- Centralize error logging to a service

---

##### 7. Missing Type Guards for Project Data

**Issue**: Type assertions used without runtime validation.

**Location**: `src/pages/Index.tsx:17`

```typescript
const data: ProjectsData = await response.json();
```

**Problems**:

- No validation that fetched data matches expected shape
- Could cause runtime errors if projects.json is malformed
- No Zod or similar schema validation

**Suggested Fix**:

- Add Zod schema validation in `src/lib/schemas/project.ts`
- Validate data before setting state
- Provide fallback/default data on validation failure

---

### Responsibility Issues

#### 1. Page Component Doing Too Much (Index.tsx)

**Responsibilities currently in Index**:

- Data fetching
- Loading state management
- Error handling (minimal)
- Layout composition (Hero, ProjectsGallery, Footer)

**Should be**:

- Only layout composition
- Data fetching extracted to custom hook or data layer

---

#### 2. Projects Gallery Mixed Concerns

**Responsibilities in ProjectsGallery**:

- Search/filter state management
- Filter UI rendering
- Project list rendering
- Project selection (modal state)
- Empty state handling

**Should be split into**:

- `useProjectFilters` hook for filter logic
- FilterBar component for filter UI
- Keep ProjectsGallery as list renderer

---

#### 3. Modal State Management

**Current**: Modal state managed in ProjectsGallery, passed as props.

**Issue**: ProjectsGallery shouldn't own modal state for project details.

**Suggested Fix**:

- Lift modal state to Index page
- Or use URL-based modal state (query params)
- Or create a global modal context

---

## Summary of Duplicated Code

| Code                  | Duplicated In                                    | Extract To                                |
| --------------------- | ------------------------------------------------ | ----------------------------------------- |
| `statusColors`        | ProjectCard, ProjectModal                        | `src/lib/constants/statusColors.ts`       |
| `usageLabels`         | ProjectCard, ProjectModal                        | `src/lib/constants/usageLabels.ts`        |
| Motion variants       | Hero, ProjectsGallery, ProjectCard, ProjectModal | `src/lib/animations/variants.ts`          |
| Reduced motion checks | All animated components                          | `src/hooks/useReducedMotion.ts` (wrapper) |

## Summary of Responsibility Issues

| Component       | Current Issues           | Suggested Fix                                                   |
| --------------- | ------------------------ | --------------------------------------------------------------- |
| Index           | Data fetching, layout    | Extract data to `useProjects` hook                              |
| ProjectsGallery | Filters + list rendering | Split filters to `useProjectFilters` hook + FilterBar component |
| ProjectModal    | State owned by Gallery   | Lift to Index or use URL state                                  |
| NavLink         | Defined but unused       | Remove or create proper nav                                     |

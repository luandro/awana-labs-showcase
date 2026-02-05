# Data Fetching Patterns Review

## Task

Review data fetching patterns and list all distinct patterns across the codebase.

## Summary

This document provides a comprehensive review of all data fetching patterns used in the awana-labs-showcase repository.

## Distinct Data Fetching Patterns

### Pattern 1: useEffect + fetch API (Async/Await)

**Location**: `/src/pages/Index.tsx` (lines 11-27)

**Description**: The primary data fetching pattern uses React's `useEffect` hook with the native `fetch` API and async/await syntax.

**Implementation**:

```typescript
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

**Characteristics**:

- Uses `useState` for loading state management
- Fetches static JSON file from public directory
- Error handling with try-catch
- Cleanup with finally block
- Empty dependency array (runs once on mount)
- Direct response.json() parsing

### Pattern 2: Event Listener Data Fetching (useEffect + matchMedia)

**Location**: `/src/hooks/use-mobile.tsx` (lines 8-16)

**Description**: Uses `useEffect` to set up and tear down event listeners for responsive design data fetching.

**Implementation**:

```typescript
React.useEffect(() => {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  const onChange = () => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  };
  mql.addEventListener("change", onChange);
  setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  return () => mql.removeEventListener("change", onChange);
}, []);
```

**Characteristics**:

- Reactive data fetching from browser APIs
- Event listener setup/teardown pattern
- No network requests (browser API polling)
- Cleanup function for removing listeners
- Initial state setting on mount

### Pattern 3: useEffect for DOM/State Synchronization

**Location**: `/src/components/ProjectModal.tsx` (lines 31-33, 55-66)

**Description**: Uses `useEffect` for state synchronization and DOM manipulation rather than data fetching.

**Implementation** (State Sync):

```typescript
useEffect(() => {
  setCurrentImageIndex(0);
}, [project?.id]);
```

**Implementation** (DOM manipulation):

```typescript
useEffect(() => {
  document.addEventListener("keydown", handleKeyDown);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";
  };
}, [handleKeyDown, isOpen]);
```

**Characteristics**:

- State synchronization on prop changes
- DOM manipulation (body scroll lock)
- Event listener management
- Cleanup for side effects
- No network requests

### Pattern 4: Script-based Data Fetching (Build-time)

**Location**: `/scripts/fetch-projects.ts`

**Description**: Server-side/build-time script using Bun runtime for fetching data from GitHub API.

**Usage**: Run via `npm run fetch:projects`

**Characteristics**:

- Runs outside of React context
- Build-time data generation
- Writes to `public/projects.json`
- Uses Bun runtime (not Node.js)
- Likely uses GitHub API for data source

## Pattern Analysis

### Current State

- **Total distinct patterns**: 4
- **Network fetching patterns**: 1 (useEffect + fetch)
- **Build-time fetching**: 1 (scripts/fetch-projects.ts)
- **Browser API patterns**: 1 (matchMedia)
- **State sync patterns**: 1 (DOM manipulation)

### Observations

#### Strengths

1. **Simple and Direct**: The useEffect + fetch pattern is straightforward and easy to understand
2. **No External Dependencies**: Uses native fetch API, avoiding library overhead
3. **Error Handling**: Basic try-catch error handling in place
4. **Loading States**: Proper loading state management

#### Areas for Improvement

1. **No Request Cancellation**
   - fetch requests don't use AbortController
   - Component unmount could leave pending requests
   - Race conditions possible with rapid remounts

2. **No Caching Strategy**
   - Re-fetches on every component mount
   - No browser caching optimization
   - No stale-while-revalidate pattern

3. **No Request Deduplication**
   - Multiple components requesting same data would create duplicate requests
   - No shared state management

4. **Limited Error Recovery**
   - Basic console.error logging
   - No retry logic
   - No error boundary integration

5. **No Data Validation**
   - Assumes JSON structure is correct
   - No runtime type checking beyond TypeScript
   - Could benefit from Zod schema validation (already in dependencies)

6. **Hard-coded URL Construction**
   - `${import.meta.env.BASE_URL}projects.json` is fragile
   - No configuration management
   - Environment-specific logic in component

## Recommendations

### Immediate Improvements (Low Effort)

1. Add AbortController for request cancellation
2. Add request timeout handling
3. Implement basic error boundaries
4. Add console warning for empty data

### Medium-term Improvements

1. Extract fetch logic to custom hook (`useProjects.ts`)
2. Add Zod schema validation for fetched data
3. Implement simple in-memory caching
4. Add retry logic with exponential backoff

### Long-term Considerations

1. Evaluate React Query or SWR for advanced use cases
2. Implement service worker for offline support
3. Add request deduplication layer
4. Consider prefetching strategies

## File Inventory

### Files with Data Fetching

- `/src/pages/Index.tsx` - Primary data fetching from projects.json
- `/src/hooks/use-mobile.tsx` - Browser API data (matchMedia)
- `/src/components/ProjectModal.tsx` - State sync and DOM manipulation
- `/scripts/fetch-projects.ts` - Build-time data fetching

### Files Using useEffect (Non-fetching)

- `/src/components/ui/carousel.tsx` - UI state management
- `/src/components/ui/sidebar.tsx` - UI state management
- `/src/hooks/use-toast.ts` - Toast state management
- `/src/pages/NotFound.tsx` - UI effects

## Conclusion

The codebase uses a minimal, direct approach to data fetching with native browser APIs. The primary pattern (useEffect + fetch) is functional but lacks advanced features like caching, cancellation, and deduplication. For the current scale of the application, this simplicity is appropriate, but consideration should be given to the recommended improvements as the application grows.

**Pattern Count**: 4 distinct patterns identified
**Primary Pattern**: useEffect + fetch API (1 occurrence)
**Secondary Patterns**: Event listeners, state sync, build-time scripts

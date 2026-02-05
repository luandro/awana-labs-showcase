# Product Requirements Document (PRD)

## Findings

### Hotspots Analysis

#### Top 5 Largest Files (by Line Count)

1. **src/components/ui/sidebar.tsx** (637 lines, 24KB)
   - Largest file in the codebase
   - Contains multiple component exports (Sidebar, SidebarContent, SidebarFooter, etc.)
   - Likely generated from shadcn/ui - a complex UI component with many sub-components
   - Hotspot reason: Monolithic file with multiple components that could be split

2. **src/components/ProjectModal.tsx** (305 lines, 12KB)
   - Main project modal component
   - Likely handles project creation/editing logic
   - Hotspot reason: Large single component with potential for extraction of sub-components

3. **src/components/ui/chart.tsx** (303 lines, 12KB)
   - Chart component (likely recharts-based from shadcn/ui)
   - Generated UI component
   - Hotspot reason: Third-party generated code, acceptable size

4. **src/components/ui/carousel.tsx** (224 lines, 8KB)
   - Carousel component from shadcn/ui
   - Generated UI component
   - Hotspot reason: Third-party generated code, acceptable size

5. **src/components/ui/menubar.tsx** (207 lines, 8KB)
   - Menubar component from shadcn/ui
   - Generated UI component
   - Hotspot reason: Third-party generated code, acceptable size

**Summary**: The largest files are primarily shadcn/ui generated components. The main custom component hotspot is `ProjectModal.tsx` which could benefit from component extraction.

#### Top 5 Most-Imported Modules

**External Dependencies:**

1. **lucide-react** (23 imports)
   - Icon library used throughout the application
   - Consistent pattern across components
   - Hotspot reason: High usage indicates good icon consistency

2. **class-variance-authority** (10 imports)
   - Utility for variant-based class management
   - Used primarily in shadcn/ui components
   - Hotspot reason: Core styling utility, appropriate usage

3. **framer-motion** (6 imports)
   - Animation library
   - Used for motion/transition effects
   - Hotspot reason: Moderate usage for animations

**Internal Modules:**

1. **@/lib/utils** (45 imports)
   - Central utility functions (likely cn() for class merging)
   - Used across almost every component
   - Hotspot reason: Critical utility module - high cohesion, appropriate dependency

2. **@/components/ui/button** (6 imports)
   - Button component
   - Most-used UI component
   - Hotspot reason: Core UI primitive, high reuse

3. **@/types/project** (4 imports)
   - Project type definitions
   - Central type authority for project data
   - Hotspot reason: Good type centralization

4. **@/hooks/use-toast** (2 imports)
   - Toast notification hook
   - Moderate usage for notifications
   - Hotspot reason: Appropriate usage pattern

5. **@/components/ui/tooltip** (2 imports)
   - Tooltip component
   - Common UI pattern
   - Hotspot reason: Appropriate usage pattern

### Key Insights

**Strengths:**

- Good centralization of utilities (@/lib/utils)
- Consistent use of icon library (lucide-react)
- Type definitions are centralized (@/types/project)
- shadcn/ui components provide consistent UI patterns

**Areas for Improvement:**

- `ProjectModal.tsx` (305 lines) could be split into smaller components
- `sidebar.tsx` is large but generated - acceptable as-is
- Consider extracting sub-components from `ProjectModal.tsx` for better maintainability

**Total Import Context:**

- 226 total imports across the codebase
- Mix of external libraries, internal utilities, and UI components
- Well-organized import patterns using @ alias for internal modules

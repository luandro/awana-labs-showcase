/**
 * Project Type Definitions
 *
 * This file exports TypeScript types derived from Zod schemas.
 * The runtime validation schemas are defined in src/types/project.schema.ts
 *
 * For runtime validation, import from '@/types/project.schema':
 *   import { projectSchema, parseProjectsData } from '@/types/project.schema';
 *
 * For type-only usage, you can import from this file:
 *   import type { Project, ProjectsData } from '@/types/project';
 */

// Re-export types from the schema file
export type {
  Project,
  ProjectsData,
  Organization,
  Status,
  Media,
  Links,
  Timestamps,
  ProjectState,
  ProjectUsage,
} from "./project.schema";

// Legacy type alias for backwards compatibility
// TODO: Migrate imports to use the types from project.schema directly
export interface ProjectLegacy {
  id: string;
  issue_number: number;
  title: string;
  slug: string;
  description: string;
  organization: {
    name: string;
    short_name: string;
    url: string;
  };
  status: {
    state: "active" | "paused" | "archived";
    usage: "experimental" | "used" | "widely-used";
    notes: string;
  };
  tags: string[];
  media: {
    logo: string;
    images: string[];
  };
  links: {
    homepage: string;
    repository: string;
    documentation: string;
  };
  timestamps: {
    created_at: string;
    last_updated_at: string;
  };
}

export interface ProjectsDataLegacy {
  projects: ProjectLegacy[];
}

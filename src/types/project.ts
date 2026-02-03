export interface Project {
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
    state: 'active' | 'paused' | 'archived';
    usage: 'experimental' | 'used' | 'widely-used';
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

export interface ProjectsData {
  projects: Project[];
}

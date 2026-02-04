import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ProjectsGallery from "@/components/ProjectsGallery";
import Footer from "@/components/Footer";
import type { Project } from "@/types/project";
import { parseProjectsData } from "@/types/project.schema";

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}projects.json`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const json = await response.json();

        // Validate the data with Zod schema
        const data = parseProjectsData(json);
        setProjects(data.projects);
      } catch (error) {
        console.error("Failed to load projects:", error);
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">
            Failed to load projects
          </h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <ProjectsGallery projects={projects} />
      <Footer />
    </main>
  );
};

export default Index;

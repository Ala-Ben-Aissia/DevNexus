import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/projects";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
};

export async function loader() {
  const projects = await fetch("http://localhost:8000/projects").then<
    Promise<Project[]>
  >((res) => res.json());
  return projects;
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const projects = loaderData;

  return (
    <>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
        ✨ My Projects
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </>
  );
}

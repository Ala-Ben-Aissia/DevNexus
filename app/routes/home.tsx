import type { Project } from "~/types";
import type { Route } from "./+types/home";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";

export async function loader() {
  const projects = await fetch(`${import.meta.env.VITE_API_URL}/projects`).then<
    Promise<Project[]>
  >((res) => res.json());
  return projects.filter((p) => p.featured);
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const featuredProjects = loaderData;

  return (
    <>
      {featuredProjects.length > 0 && (
        <FeaturedProjects featuredProjects={featuredProjects} />
      )}
      <AboutPreview />
    </>
  );
}

import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/projects";
import Pagination from "~/components/Pagination";
import { usePage } from "~/hooks/usePage";
import { useState } from "react";

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

export function meta({}: Route.MetaArgs) {
  const title = "Dev Nexus | Projects";
  return [
    { title: "Dev Nexus | Projects" },
    {
      name: "description",
      content:
        "A list of projects I've worked on, including web development and other projects.",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content:
        "A list of projects I've worked on, including web development and other projects.",
    },
    {
      property: "og:url",
      content: "https://devnexus.vercel.app/projects",
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content:
        "A list of projects I've worked on, including web development and other projects.",
    },
  ];
}

export async function loader() {
  const projects = await fetch("http://localhost:8000/projects").then<
    Promise<Project[]>
  >((res) => res.json());
  return projects;
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const [category, setCategory] = useState("All");
  const projects = loaderData;

  const filteredProjects =
    category === "All"
      ? projects
      : projects.filter((p) => p.category === category);

  const {
    items: displayedProject,
    totalPages,
    currentPage,
    onPageChange,
    goNext,
    goPrev,
  } = usePage({
    list: filteredProjects,
    perPage: 4,
  });

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
        ✨ My Projects
      </h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            onClick={() => {
              onPageChange(1);
              setCategory(c);
            }}
            name="category"
            id="categoy"
            className={`px-3 py-1 text-sm rounded cursor-pointer ${
              category === c
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
            key={c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProject.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          goNext={goNext}
          goPrev={goPrev}
        />
      </div>
    </>
  );
}

import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/projects";
import Pagination from "~/components/Pagination";
import { usePage } from "~/hooks/usePage";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "~/types";
import { useTheme } from "~/contexts/ThemeContext";

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
  const projects = await fetch(
    `${import.meta.env.VITE_API_URL}/api/projects?populate=*`,
  ).then<Promise<{ data: Project[] }>>((res) => res.json());

  return projects.data.map((p) => {
    const imageUrl = p.image?.url ? `${p.image.url}` : "/images/no-image.png";
    const imageUrlLight = p.imageLight?.url
      ? `${p.imageLight.url}`
      : "/images/no-image-light.jpg";
    return {
      ...p,
      image: {
        url: imageUrl,
      },
      imageLight: {
        url: imageUrlLight,
      },
    };
  });
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
    list: filteredProjects.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
    perPage: 3,
  });

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <div className="space-y-12 lg:space-y-16">
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] tracking-tight">
          My{" "}
          <span className="font-medium text-[var(--color-text)] relative">
            Projects
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-fluid-lg text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
          A collection of projects showcasing my expertise in modern web
          development and design.
        </p>
      </div>

      <div
        className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        {categories.map((c, index) => (
          <button
            onClick={() => {
              onPageChange(1);
              setCategory(c);
            }}
            name="category"
            id="category"
            className={`px-6 py-3 text-fluid-sm rounded-full cursor-pointer transition-all duration-500 border hover-lift relative overflow-hidden ${
              category === c
                ? "bg-[var(--color-accent)] text-[var(--color-text)] border-[var(--color-accent)] shadow-md"
                : "bg-[var(--color-secondary)] text-[var(--color-text-light)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-tertiary)]"
            }`}
            key={c}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="relative z-10">{c}</span>
            {category === c && (
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-20"></div>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 xl:gap-12"
          style={{
            containerType: "inline-size",
          }}
        >
          {displayedProject.map((project, index) => (
            <motion.div
              layout
              key={project.documentId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div
        className="flex justify-center mt-16 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          goNext={goNext}
          goPrev={goPrev}
        />
      </div>
    </div>
  );
}

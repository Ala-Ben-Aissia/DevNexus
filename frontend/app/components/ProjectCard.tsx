import { Link } from "react-router";
import type { Project } from "~/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.documentId}`}>
      <article
        key={project.documentId}
        className="group bg-[var(--color-secondary)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover-lift transition-all duration-500 border border-[var(--color-border)] hover:border-[var(--color-accent)] h-full flex flex-col gpu-accelerated"
      >
        <div className="aspect-[16/10] w-full overflow-hidden relative">
          <img
            src={project.image.url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 right-4 w-2 h-2 bg-[var(--color-accent)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        </div>
        <div className="p-6 lg:p-8 flex-1 flex flex-col space-y-4">
          <h3 className="text-fluid-lg lg:text-fluid-xl font-normal text-[var(--color-text)] group-hover:text-[var(--color-text)] transition-colors duration-300 line-clamp-2 leading-tight">
            {project.title}
          </h3>
          <p className="text-[var(--color-text-light)] text-fluid-sm lg:text-fluid-base leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="px-3 lg:px-4 py-2 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-quaternary)] text-[var(--color-text)] text-fluid-xs lg:text-fluid-sm rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-accent)]">
              {project.category}
            </span>
            <time className="px-3 lg:px-4 py-2 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-quaternary)] text-[var(--color-text-muted)] text-fluid-xs lg:text-fluid-sm rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-accent)]">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(project.date))}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}

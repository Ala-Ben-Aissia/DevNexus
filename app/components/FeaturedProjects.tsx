import { motion } from "motion/react";
import { Link, NavLink } from "react-router";
import type { Project } from "~/types";

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Image with Clean Design */}
      <div className="aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--color-tertiary)] mb-6 lg:mb-8 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all duration-500">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>

      {/* Content with Clean Typography */}
      <div className="space-y-4 lg:space-y-6 p-6 lg:p-8 bg-[var(--color-secondary)] rounded-2xl border border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <span className="px-3 lg:px-4 py-2 bg-[var(--color-tertiary)] text-[var(--color-text)] text-xs lg:text-sm rounded-full border border-[var(--color-border)] font-normal">
            {project.category}
          </span>
          <time className="text-[var(--color-text-light)] text-sm lg:text-base">
            {new Date(project.date).getFullYear()}
          </time>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-thin text-[var(--color-text)] leading-tight transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-[var(--color-text-light)] leading-relaxed text-base lg:text-lg">
          {project.description}
        </p>

        <div className="flex items-center text-[var(--color-text-light)] hover:text-[var(--color-text)]">
          <Link to={`/projects/${project.id}`}>
            <span className="text-base lg:text-lg font-normal">
              Explore Project
            </span>{" "}
            <motion.span
              className="ml-3 inline-block hover:ease-out duration-300"
              initial={{ x: 0 }}
              // whileHover={{ x: 8 }}
              // transition={{ duration: 0.3, ease: "easeOut" }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  return (
    <div className="bg-[var(--color-primary)]">
      <section className="px-4 lg:px-6 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            {featuredProjects.slice(0, 4).map((featuredProject, index) => (
              <FeaturedProject
                key={featuredProject.id}
                project={featuredProject}
                index={index}
              />
            ))}
          </div>

          {featuredProjects.length > 4 && (
            <div className="text-center mt-16 lg:mt-20">
              <NavLink
                to="/projects"
                className="group inline-flex items-center gap-4 px-8 lg:px-12 py-3 lg:py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-tertiary)] text-[var(--color-text)] rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 font-normal text-base lg:text-lg"
              >
                <span>Discover All Projects</span>
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </NavLink>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

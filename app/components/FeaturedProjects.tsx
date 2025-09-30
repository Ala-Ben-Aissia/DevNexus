import { motion } from "motion/react";
import { Link, NavLink } from "react-router";
import type { Project } from "~/types";

function FeaturedProjectHero({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Link to={`/projects/${project.id}`} className="block">
        {/* Main container with subtle gradient background */}
        <div className="relative bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-700 hover:shadow-2xl hover:shadow-[var(--color-accent)]/10">
          {/* Image section with parallax effect */}
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent to-transparent z-10"></div>

            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Floating status indicator */}
            <div className="absolute top-6 right-6 z-20">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/10 backdrop-blur-xl rounded-full border border-white/20">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white/90">Live</span>
              </div>
            </div>

            {/* Category badge */}
            <div className="absolute top-6 left-6 z-20">
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-xl text-white/90 text-xs font-medium rounded-full border border-white/20">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content section */}
          <div className="relative p-8 lg:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

            <div className="relative z-10">
              {/* Title with subtle animation */}
              <motion.h3
                className="text-2xl lg:text-3xl font-light text-[var(--color-text)] mb-4 tracking-tight leading-tight"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>

              {/* Description */}
              <p className="text-[var(--color-text-light)] leading-relaxed mb-6 font-normal">
                {project.description}
              </p>

              {/* Meta info and CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                  <span>{new Date(project.date).getFullYear()}</span>
                  <div className="w-1 h-1 bg-[var(--color-border)] rounded-full"></div>
                  <span>Featured</span>
                </div>

                {/* Arrow with hover animation */}
                <motion.div
                  className="flex items-center gap-2 text-[var(--color-text-light)] group-hover:text-[var(--color-text)]"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm font-medium">Explore</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
    >
      <Link to={`/projects/${project.id}`} className="block">
        <div className="relative bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 hover:shadow-lg hover:shadow-[var(--color-accent)]/5 hover-lift">
          {/* Compact image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/20 to-transparent"></div>

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          {/* Compact content */}
          <div className="p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>

            <div className="relative z-10">
              <h4 className="text-lg font-medium text-[var(--color-text)] mb-3 leading-tight group-hover:text-[var(--color-text)] transition-colors duration-300">
                {project.title}
              </h4>

              <p className="text-sm text-[var(--color-text-light)] leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-text-muted)]">
                  {new Date(project.date).getFullYear()}
                </span>
                <svg
                  className="w-4 h-4 text-[var(--color-text-light)] group-hover:text-[var(--color-text)] group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProjects({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  const [heroProject, ...otherProjects] = featuredProjects;

  return (
    <div className="relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-0">
        {/* Hero project - takes full width */}
        {heroProject && (
          <motion.div
            className="mb-16 lg:mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FeaturedProjectHero project={heroProject} index={0} />
          </motion.div>
        )}

        {/* Grid of smaller projects */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {otherProjects.slice(0, 3).map((project, index) => (
              <FeaturedProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View all projects CTA */}
        {featuredProjects.length > 4 && (
          <motion.div
            className="text-center mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NavLink
              to="/projects"
              className="group inline-flex items-center gap-4 px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] hover:bg-[var(--color-tertiary)] text-[var(--color-text)] rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 hover-lift font-medium text-fluid-base relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <span className="relative z-10">Discover All Projects</span>
              <motion.svg
                className="relative z-10 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </NavLink>
          </motion.div>
        )}
      </div>
    </div>
  );
}

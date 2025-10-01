import { motion } from "motion/react";
import { Link } from "react-router";
import type { Project } from "~/types";
import Button from "./Button";

// Hero Featured Project - Large and prominent
function HeroFeaturedProject({ project }: { project: Project }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="relative w-full bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-secondary)] rounded-xl lg:rounded-3xl overflow-hidden border border-[var(--color-border)]">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent-hover)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Subtle outer glow */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-accent)] opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 -z-10"></div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 w-full">
          {/* Image Section */}
          <div className="relative w-full h-64 sm:h-80 lg:h-[400px] xl:h-[480px] overflow-hidden">
            {/* Image with parallax effect */}
            <motion.img
              src={project.image.url}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[var(--color-primary)]"></div>

            {/* Status Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-xl">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-semibold text-white/95 tracking-wide whitespace-nowrap">
                  Live Project
                </span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black/20 backdrop-blur-xl text-white/90 text-xs sm:text-sm font-semibold rounded-full border border-white/10">
                {project.category}
              </div>
            </div>

            {/* Featured Badge */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-accent-hover)]/20 backdrop-blur-xl border border-[var(--color-accent)]/30 rounded-full">
                <span className="text-xs sm:text-sm font-bold text-white/95 tracking-wide">
                  ⭐ Featured
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative w-full p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
            <div className="relative z-10">
              {/* Year and Status */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium text-[var(--color-text-muted)] tracking-wider uppercase">
                  {new Date(project.date).getFullYear()}
                </span>
                <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent"></div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-[var(--color-text)] mb-4 sm:mb-6 leading-tight tracking-tight">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-[var(--color-text-light)] leading-relaxed mb-6 sm:mb-8 font-normal">
                {project.description}
              </p>

              {/* Decorative divider */}
              <div className="relative h-px bg-gradient-to-r from-[var(--color-border)] via-[var(--color-accent)]/40 to-[var(--color-border)] mb-6 sm:mb-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 blur-sm"></div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  text="View Project"
                  to={`/projects/${project.documentId}`}
                />

                {/* Live Site Link */}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-full transition-all duration-500 text-[var(--color-text)] hover:text-[var(--color-text)] hover:bg-[var(--color-secondary)] font-medium text-sm sm:text-base hover-lift whitespace-nowrap flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <span>Live Site</span>
                  </a>
                )}

                {/* GitHub Link */}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/github inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-full transition-all duration-500 text-[var(--color-text)] hover:text-[var(--color-text)] hover:bg-[var(--color-secondary)] font-medium text-sm sm:text-base hover-lift whitespace-nowrap flex-shrink-0"
                    title="View on GitHub"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 group-hover/github:translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Secondary Project Cards - SMALLER horizontal cards
function SecondaryProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      className="group w-full"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="relative w-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-lg lg:rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 hover:shadow-xl hover:shadow-[var(--color-accent)]/5">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 group-hover:from-[var(--color-accent)]/5 group-hover:to-transparent transition-all duration-500"></div>

        <div className="flex flex-col sm:flex-row w-full">
          {/* Image Section - SMALLER */}
          <div className="relative w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
            <motion.img
              src={project.image.url}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/30 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[var(--color-primary)]"></div>

            {/* Category badge - smaller */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2 py-1 bg-white/10 backdrop-blur-xl text-white/90 text-xs font-semibold rounded-full border border-white/20">
                {project.category}
              </span>
            </div>

            {/* Status indicator - smaller */}
            <div className="absolute top-3 right-3 z-10">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
            </div>
          </div>

          {/* Content Section - SMALLER */}
          <div className="relative z-10 w-full p-5 sm:p-6 flex flex-col justify-center">
            {/* Year - smaller */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-[var(--color-text-muted)] tracking-wider uppercase whitespace-nowrap">
                {new Date(project.date).getFullYear()}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent"></div>
            </div>

            {/* Title - SMALLER than hero */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-[var(--color-text)] mb-3 leading-tight tracking-tight group-hover:text-[var(--color-text)] transition-colors duration-300">
              {project.title}
            </h3>

            {/* Description - smaller */}
            <p className="text-[var(--color-text-light)] leading-relaxed mb-4 font-normal text-sm line-clamp-2">
              {project.description}
            </p>

            {/* Divider - smaller */}
            <div className="w-8 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-4 group-hover:w-14 transition-all duration-500"></div>

            {/* Footer */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                text="View Details"
                to={`/projects/${project.documentId}`}
              />

              {/* Live Site Link */}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-full transition-all duration-500 text-[var(--color-text)] hover:bg-[var(--color-secondary)] font-medium text-sm sm:text-base hover-lift whitespace-nowrap flex-shrink-0"
                  title="Live Site"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 group-hover/link:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  <span>Live Site</span>
                </a>
              )}

              {/* GitHub Link */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/github inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-full transition-all duration-500 text-[var(--color-text)] hover:bg-[var(--color-secondary)] font-medium text-sm sm:text-base hover-lift whitespace-nowrap flex-shrink-0"
                  title="View on GitHub"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 group-hover/github:translate-x-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
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
    <div className="relative w-full">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full opacity-[0.02] blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[var(--color-accent-hover)] rounded-full opacity-[0.03] blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Featured Project - LARGE */}
        {heroProject && (
          <div className="w-full mb-8 sm:mb-10 lg:mb-12">
            <HeroFeaturedProject project={heroProject} />
          </div>
        )}

        {/* Secondary Projects - SMALLER, stacked vertically */}
        {otherProjects.length > 0 && (
          <div className="w-full space-y-5 sm:space-y-6 lg:space-y-8">
            {otherProjects.slice(0, 3).map((project, index) => (
              <SecondaryProjectCard
                key={project.documentId}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        {/* View All Projects CTA */}
        {featuredProjects.length > 4 && (
          <motion.div
            className="w-full text-center mt-10 sm:mt-12 lg:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 lg:px-14 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-secondary)] hover:from-[var(--color-tertiary)] hover:to-[var(--color-tertiary)] text-[var(--color-text)] rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 font-semibold text-sm sm:text-base relative overflow-hidden shadow-lg shadow-transparent hover:shadow-[var(--color-accent)]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 via-[var(--color-accent-hover)]/10 to-[var(--color-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 whitespace-nowrap">
                Discover All Projects
              </span>
              <motion.svg
                className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

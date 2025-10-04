import type { Project } from "~/types";
import type { Route } from "./+types/project";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
import Copy from "~/components/Copy";
import { useTheme } from "~/contexts/ThemeContext";

export function meta({ loaderData }: Route.MetaArgs) {
  const project = loaderData;
  if (!project) {
    return [
      { title: "Dev Nexus}" },
      {
        description:
          "A list of projects I've worked on, including web development and other projects.",
      },
    ];
  }
  const title = `${project.title} | Dev Nexus`;
  return [
    { title },
    {
      name: "description",
      content: project.description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: project.description,
    },
    {
      property: "og:image",
      content: project.image,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: project.description,
    },
    {
      property: "twitter:image",
      content: project.image,
    },
  ];
}

const cache = { project: null } as { project: Project | null };

export async function clientLoader({ params }: Route.LoaderArgs) {
  if (cache.project) {
    return cache.project;
  }
  const id = params.id;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/${id}?populate=*`,
    );
    if (!res.ok) {
      throw new Response("Error loading project", { status: res.status });
    }
    const projectData = (await res.json()) as { data: Project };
    if (!projectData) {
      throw new Response("Not Found", { status: 404 });
    }
    const imageUrl = `${projectData.data.image.url ?? "/images/no-image.png"}`;
    const imageLightUrl = projectData.data.imageLight?.url
      ? `${projectData.data.imageLight.url}`
      : undefined;
    const project = {
      ...projectData.data,
      image: {
        url: imageUrl,
      },
      imageLight: imageLightUrl ? { url: imageLightUrl } : undefined,
    };
    cache["project"] = project;
    return project;
  } catch (error) {
    throw new Response("Error loading project", { status: 500 });
  }
}

export function hydrateFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 animate-fade-in-up">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full animate-spin">
            <div className="absolute inset-2 bg-[var(--color-primary)] rounded-full"></div>
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full blur-lg opacity-50 animate-pulse"></div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[var(--color-text)] tracking-tight">
          Loading <span className="font-medium">Project</span>...
        </h1>
      </div>
    </div>
  );
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const project = loaderData;
  const [imageLoaded, setImageLoaded] = useState(false);
  const { theme } = useTheme();

  // Determine which image to show based on theme
  const displayImage =
    theme === "light" && project.imageLight?.url
      ? project.imageLight.url
      : project.image.url;

  const features = [
    { name: "Modern Design", color: "var(--color-accent)" },
    { name: "Responsive Layout", color: "#c678dd" },
    { name: "Fast Performance", color: "#98c379" },
    { name: "User Friendly", color: "#e5c07b" },
    { name: "SEO Optimized", color: "#61afef" },
    { name: "Accessible", color: "#e06c75" },
  ];

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-[var(--color-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 sm:gap-3 text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <span className="font-medium text-sm sm:text-base">
              Back to Projects
            </span>
          </Link>
        </div>
      </motion.div>

      {/* Hero Section with Project Image */}
      <div className="relative bg-[var(--color-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Badges and Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] text-xs sm:text-sm font-medium rounded-full border border-[var(--color-border)]">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[var(--color-accent)]/20 to-[var(--color-accent-hover)]/20 text-xs sm:text-sm font-semibold rounded-full border border-[var(--color-accent)]/30">
                ⭐ Featured
              </span>
            )}
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[var(--color-secondary)] text-[var(--color-text-muted)] text-xs sm:text-sm font-medium rounded-full border border-[var(--color-border)]">
              {new Date(project.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-[var(--color-text)] mb-4 sm:mb-6 tracking-tight leading-tight"
          >
            <span className="font-medium">{project.title}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-[var(--color-text-light)] max-w-3xl leading-relaxed mb-8 sm:mb-12"
          >
            {project.description}
          </motion.p>

          {/* Hero Image - Contained with Border and Shadow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--color-border)] shadow-2xl shadow-black/20 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)]"
          >
            {/* Aspect ratio container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <motion.img
                key={displayImage}
                src={displayImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{
                  scale: imageLoaded ? 1 : 1.05,
                  opacity: imageLoaded ? 1 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Subtle overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent blur-3xl pointer-events-none"></div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 lg:p-10 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[var(--color-text)] mb-4 sm:mb-6 tracking-tight">
                  Project <span className="font-medium">Overview</span>
                </h2>
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 sm:mb-8"></div>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-light)] leading-relaxed">
                    {project.description} This project showcases modern web
                    development practices with a focus on user experience,
                    performance, and accessibility. Built with the latest
                    technologies and best practices in mind.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 lg:p-10 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[var(--color-text)] mb-4 sm:mb-6 tracking-tight">
                  Key <span className="font-medium">Features</span>
                </h3>
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6 sm:mb-8"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-quaternary)] rounded-xl sm:rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover-lift"
                    >
                      <div
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span className="text-[var(--color-text)] font-medium text-sm sm:text-base group-hover:text-[var(--color-text)] transition-colors duration-300">
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] p-5 sm:p-6 lg:p-8 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-light text-[var(--color-text)] mb-4 sm:mb-6 tracking-tight">
                  Project <span className="font-medium">Details</span>
                </h3>
                <div className="w-10 sm:w-12 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-5 sm:mb-6"></div>

                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mb-2 block">
                      Launch Date
                    </label>
                    <p className="text-[var(--color-text)] font-semibold text-sm sm:text-base">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="w-full h-px bg-[var(--color-border)]"></div>

                  <div>
                    <label className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mb-2 block">
                      Category
                    </label>
                    <p className="text-[var(--color-text)] font-semibold text-sm sm:text-base capitalize">
                      {project.category}
                    </p>
                  </div>

                  <div className="w-full h-px bg-[var(--color-border)]"></div>

                  <div>
                    <label className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mb-2 block">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-[var(--color-text)] font-semibold text-sm sm:text-base">
                        Live & Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-3 sm:space-y-4"
            >
              {project.url && (
                <Link
                  to={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 sm:gap-3 w-full px-5 py-3 sm:px-6 sm:py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-xl sm:rounded-2xl transition-all duration-500 hover-lift text-sm sm:text-base relative overflow-hidden border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
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
                    <span>View Live Project</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
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
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </Link>
              )}

              {project.githubUrl && (
                <Link
                  to={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 sm:gap-3 w-full px-5 py-3 sm:px-6 sm:py-4 bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)] font-semibold rounded-xl sm:rounded-2xl transition-all duration-500 hover-lift text-sm sm:text-base hover:bg-[var(--color-secondary)]"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                  <span>View on GitHub</span>
                </Link>
              )}

              <Copy link={project.url} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="py-12 sm:py-16 lg:py-20"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] p-8 sm:p-12 lg:p-16 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-[var(--color-text)] mb-4 sm:mb-6 tracking-tight">
                Ready to Work <span className="font-medium">Together?</span>
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-light)] mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
                I'm always excited to work on new projects and collaborate with
                like-minded individuals. Let's discuss how we can bring your
                ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-full transition-all duration-500 hover-lift text-sm sm:text-base relative overflow-hidden w-full sm:w-auto sm:min-w-[200px]"
                >
                  <span className="relative z-10">Start a Project</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </Link>
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift text-sm sm:text-base w-full sm:w-auto sm:min-w-[200px]"
                >
                  <span>View All Projects</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0"
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

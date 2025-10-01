import type { Project } from "~/types";
import type { Route } from "./+types/project";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

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
    // {
    //   property: "og:url",
    //   content: `https://devnexus.vercel.app/projects/${project.documentId}`,
    // },
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

export async function clientLoader({ params }: Route.LoaderArgs) {
  const id = params.id;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/${id}?populate=*`
    );
    if (!res.ok) {
      throw new Response("Error loading project", { status: res.status });
    }
    const project = (await res.json()) as { data: Project };
    if (!project) {
      throw new Response("Not Found", { status: 404 });
    }
    const imageUrl = `${import.meta.env.VITE_API_URL}${
      project.data.image.url ?? "/images/no-image.png"
    }`;
    return {
      ...project.data,
      image: {
        url: imageUrl,
      },
    };
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
        <h1 className="text-fluid-2xl font-light text-[var(--color-text)] tracking-tight">
          Loading <span className="font-medium">Project</span>...
        </h1>
      </div>
    </div>
  );
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const project = loaderData;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${project.url}`);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const features = [
    { name: "Modern Design", color: "var(--color-accent)" },
    { name: "Responsive Layout", color: "#c678dd" },
    { name: "Fast Performance", color: "#98c379" },
    { name: "User Friendly", color: "#e5c07b" },
    { name: "SEO Optimized", color: "#61afef" },
    { name: "Accessible", color: "#e06c75" },
  ];

  return (
    <div className="space-y-0">
      {/* Back Navigation */}
      <div className="animate-fade-in-up bg-[var(--color-primary)] border-b border-[var(--color-border)] py-6">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
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
            <span className="font-medium text-fluid-base">
              Back to Projects
            </span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Hero Image */}
        <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          <motion.img
            src={project.image.url}
            alt={project.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{
              scale: imageLoaded ? 1 : 1.1,
              opacity: imageLoaded ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-[var(--color-primary)]/20 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-6xl mx-auto">
              {/* Badges */}
              <motion.div
                className="flex flex-wrap items-center gap-3 mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="px-4 py-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text)] text-fluid-sm font-medium rounded-full border border-[var(--color-border)] backdrop-blur-sm">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-[var(--color-text)] text-fluid-sm font-medium rounded-full border border-[var(--color-accent)] backdrop-blur-sm">
                    ⭐ Featured
                  </span>
                )}
                <span className="px-4 py-2 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] text-[var(--color-text-light)] text-fluid-sm font-medium rounded-full border border-[var(--color-border)] backdrop-blur-sm">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-fluid-5xl lg:text-fluid-7xl font-light text-[var(--color-text)] mb-6 tracking-tight leading-tight"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="font-medium">{project.title}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-fluid-lg text-[var(--color-text-light)] max-w-3xl leading-relaxed font-normal"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="max-w-6xl mx-auto px-6 py-16 lg:py-24 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Overview */}
            <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-10 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h2 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-6 tracking-tight">
                  Project <span className="font-medium">Overview</span>
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-8"></div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                    {project.description} This project showcases modern web
                    development practices with a focus on user experience,
                    performance, and accessibility. Built with the latest
                    technologies and best practices in mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-10 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h3 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-6 tracking-tight">
                  Key <span className="font-medium">Features</span>
                </h3>
                <div className="w-16 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-8"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group flex items-center gap-4 p-4 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-quaternary)] rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover-lift"
                    >
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span className="text-[var(--color-text)] font-medium text-fluid-base group-hover:text-[var(--color-text)] transition-colors duration-300">
                        {feature.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-6 lg:p-8 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <h3 className="text-fluid-xl font-light text-[var(--color-text)] mb-6 tracking-tight">
                  Project <span className="font-medium">Details</span>
                </h3>
                <div className="w-12 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6"></div>

                <div className="space-y-6">
                  <div>
                    <label className="text-fluid-sm text-[var(--color-text-muted)] font-medium mb-2 block">
                      Launch Date
                    </label>
                    <p className="text-[var(--color-text)] font-semibold text-fluid-base">
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="w-full h-px bg-[var(--color-border)]"></div>

                  <div>
                    <label className="text-fluid-sm text-[var(--color-text-muted)] font-medium mb-2 block">
                      Category
                    </label>
                    <p className="text-[var(--color-text)] font-semibold text-fluid-base capitalize">
                      {project.category}
                    </p>
                  </div>

                  <div className="w-full h-px bg-[var(--color-border)]"></div>

                  <div>
                    <label className="text-fluid-sm text-[var(--color-text-muted)] font-medium mb-2 block">
                      Status
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <p className="text-[var(--color-text)] font-semibold text-fluid-base">
                        Live & Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full px-6 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-2xl text-center transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden border border-[var(--color-accent)] hover:border-[var(--color-accent-hover)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg
                    className="w-5 h-5"
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
                  View Live Project
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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

              <button
                onClick={handleCopyLink}
                className="group w-full px-6 py-4 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] hover:bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)] font-medium rounded-2xl transition-all duration-300 hover-lift text-fluid-base relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {copySuccess ? "Link Copied!" : "Copy Link"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="text-center py-16 lg:py-20 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-12 lg:p-16 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10">
              <h3 className="text-fluid-2xl lg:text-fluid-4xl font-light text-[var(--color-text)] mb-6 tracking-tight">
                Ready to Work <span className="font-medium">Together?</span>
              </h3>
              <p className="text-fluid-base text-[var(--color-text-light)] mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
                I'm always excited to work on new projects and collaborate with
                like-minded individuals. Let's discuss how we can bring your
                ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-full transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden min-w-[200px] justify-center"
                >
                  <span className="relative z-10">Start a Project</span>
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                  className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift text-fluid-base min-w-[200px] justify-center"
                >
                  <span>View All Projects</span>
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
      </div>
    </div>
  );
}

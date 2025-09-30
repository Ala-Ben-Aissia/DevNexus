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
    <div className="space-y-20 lg:space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-12 lg:space-y-16 animate-fade-in-up relative">
        {/* Floating badges */}
        {/*<div className="absolute top-0 left-1/4 w-20 h-20 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full opacity-10 blur-xl animate-pulse"></div>*/}
        <div
          className="absolute top-20 right-1/3 w-14 h-14 bg-gradient-to-br from-[var(--color-accent-hover)] to-[var(--color-accent)] rounded-full opacity-20 blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-full text-fluid-sm font-medium mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Available for new projects
        </div>

        <div className="space-y-8">
          <h1 className="text-fluid-5xl lg:text-fluid-8xl font-light text-[var(--color-text)] leading-tight tracking-tight">
            <span className="block mb-4">Crafting Digital</span>
            <span className="font-medium text-[var(--color-text)] relative inline-block">
              Experiences
              <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-40 animate-shimmer"></div>
            </span>
            <div className="text-fluid-lg lg:text-fluid-xl text-[var(--color-text-light)] font-normal mt-4">
              That Drive Results
            </div>
          </h1>

          {/* Enhanced tagline with stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12">
            <div className="text-center">
              <div className="text-fluid-2xl font-medium text-[var(--color-text)]">
                50+
              </div>
              <div className="text-fluid-sm text-[var(--color-text-light)]">
                Projects Delivered
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[var(--color-border)]"></div>
            <div className="text-center">
              <div className="text-fluid-2xl font-medium text-[var(--color-text)]">
                3+
              </div>
              <div className="text-fluid-sm text-[var(--color-text-light)]">
                Years Experience
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[var(--color-border)]"></div>
            <div className="text-center">
              <div className="text-fluid-2xl font-medium text-[var(--color-text)]">
                100%
              </div>
              <div className="text-fluid-sm text-[var(--color-text-light)]">
                Client Satisfaction
              </div>
            </div>
          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full"></div>
          <p className="text-fluid-lg lg:text-fluid-xl text-[var(--color-text-light)] font-normal leading-relaxed max-w-4xl mx-auto">
            Full-stack developer specializing in modern web technologies. I
            transform complex ideas into elegant, scalable solutions that exceed
            expectations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8">
          <a
            href="/projects"
            className="group px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-secondary)] hover:bg-[var(--color-tertiary)] text-[var(--color-text)] font-medium rounded-full transition-all duration-500 border border-[var(--color-border)] hover:border-[var(--color-accent)] hover-lift min-w-[200px] lg:min-w-[240px] text-fluid-base relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </a>
          <a
            href="/contact"
            className="group px-8 lg:px-12 py-4 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift min-w-[200px] lg:min-w-[240px] text-fluid-base"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-center mb-16 lg:mb-20">
            {/* Section badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-accent)]/79 to-[var(--color-accent-hover)] border border-[var(--color-border)] text-[var(--color-text)] rounded-full text-fluid-sm font-medium mb-6">
              <span className="text-lg">🔥</span>&nbsp;&nbsp;Featured Projects
            </div>

            <h2 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] mb-6 tracking-tight">
              Selected{" "}
              <span className="font-medium relative">
                Work
                <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
              </span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-6"></div>
            <p className="text-fluid-base lg:text-fluid-lg text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
              Handpicked projects that demonstrate technical excellence,
              creative problem-solving, and measurable business impact across
              various industries.
            </p>
          </div>
          <FeaturedProjects featuredProjects={featuredProjects} />
        </section>
      )}

      {/* About Preview Section */}
      <section
        className="animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        <AboutPreview />
      </section>

      {/* Call to Action */}
      <section
        className="text-center py-16 lg:py-20 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-12 lg:p-16 hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>

          {/* Floating elements */}
          {/* <div className="absolute top-6 right-6 w-8 h-8 border-2 border-[var(--color-accent)] rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-6 left-6 w-6 h-6 bg-[var(--color-accent)] rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div> */}

          <div className="relative z-10">
            {/* Response time badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-fluid-sm font-medium mb-8">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Usually responds within 24 hours
            </div>

            <h3 className="text-fluid-3xl lg:text-fluid-5xl font-light text-[var(--color-text)] mb-6 tracking-tight">
              Let's Build Something <span className="font-medium">Amazing</span>
            </h3>
            <p className="text-fluid-base lg:text-fluid-lg text-[var(--color-text-light)] mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you're a startup looking to make your mark or an
              established business ready to innovate, I'm here to turn your
              vision into reality.
            </p>

            {/* Enhanced CTAs with benefits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-8">
              <a
                href="/contact"
                className="group inline-flex items-center gap-4 px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-full transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden min-w-[200px] justify-center"
              >
                <span className="relative z-10">Start Your Project</span>
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
              </a>

              <a
                href="#"
                className="group inline-flex items-center gap-3 text-[var(--color-text-light)] hover:text-[var(--color-text)] font-medium text-fluid-base transition-colors duration-300"
              >
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Schedule a free consultation
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-[var(--color-text-light)] text-fluid-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free initial consultation
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Flexible engagement models
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                100% satisfaction guarantee
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

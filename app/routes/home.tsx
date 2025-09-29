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
      <section className="text-center space-y-12 lg:space-y-16 animate-fade-in-up">
        <div className="space-y-8">
          <h1 className="text-fluid-5xl lg:text-fluid-8xl font-thin text-[var(--color-text)] leading-tight tracking-tight">
            Crafting Digital{" "}
            <span className="font-normal text-[var(--color-text)] relative inline-block">
              Experiences
              <div className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-40 animate-shimmer"></div>
            </span>
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full"></div>
          <p className="text-fluid-lg lg:text-fluid-xl text-[var(--color-text-light)] font-light leading-relaxed max-w-4xl mx-auto">
            I'm a passionate developer dedicated to creating elegant,
            functional, and user-centered digital solutions that make a
            difference.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8">
          <a
            href="/projects"
            className="group px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-secondary)] hover:bg-[var(--color-tertiary)] text-[var(--color-text)] font-normal rounded-full transition-all duration-500 border border-[var(--color-border)] hover:border-[var(--color-accent)] hover-lift min-w-[200px] lg:min-w-[240px] text-fluid-base relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </a>
          <a
            href="/contact"
            className="group px-8 lg:px-12 py-4 lg:py-5 text-[var(--color-text)] font-normal rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift min-w-[200px] lg:min-w-[240px] text-fluid-base"
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
            <h2 className="text-fluid-4xl lg:text-fluid-6xl font-thin text-[var(--color-text)] mb-6 tracking-tight">
              Featured{" "}
              <span className="font-normal relative">
                Work
                <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
              </span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-4"></div>
            <p className="text-fluid-base lg:text-fluid-lg text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed">
              A selection of recent projects that showcase my skills and passion
              for creating meaningful digital experiences.
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
          <div className="relative z-10">
            <h3 className="text-fluid-3xl lg:text-fluid-5xl font-thin text-[var(--color-text)] mb-6 tracking-tight">
              Ready to work <span className="font-normal">together?</span>
            </h3>
            <p className="text-fluid-base lg:text-fluid-lg text-[var(--color-text-light)] mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center gap-4 px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-normal rounded-full transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden"
            >
              <span className="relative z-10">Start a Conversation</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Project } from "~/types";
import type { Route } from "./+types/home";
import FeaturedProjects from "~/components/FeaturedProjects";
import FeaturedPosts from "~/components/FeaturedPosts";
import AboutPreview from "~/components/AboutPreview";
import StatusBadge from "~/components/StatusBadge";
import { Link } from "react-router";

export async function loader({}: Route.LoaderArgs) {
  // Fetch featured projects
  const projects = await fetch(
    `${import.meta.env.VITE_API_URL}/api/projects?populate=*`,
  ).then<Promise<{ data: Project[] }>>((res) => res.json());

  // console.dir({ projects: projects.data }, { depth: null });

  // Fetch blog posts
  const postsResponse = await fetch(
    `${import.meta.env.VITE_API_URL}/api/posts`,
  );
  const posts = postsResponse.ok ? await postsResponse.json() : [];
  const imageUrl = (p: Project) =>
    p.image?.url ? `${p.image.url}` : "/images/no-image.png";
  const imageUrlLight = (p: Project) =>
    p.imageLight?.url ? `${p.imageLight.url}` : "/images/no-image-light.jpg";
  return {
    featuredProjects: projects.data
      .map((p) => ({
        ...p,
        image: {
          url: imageUrl(p),
        },
        imageLight: {
          url: imageUrlLight(p),
        },
      }))
      .filter((p) => p.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    posts: posts.data,
  };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { featuredProjects, posts } = loaderData;

  return (
    <div className="w-full overflow-x-hidden space-y-20 lg:space-y-32">
      {/* Hero Section */}
      <section className="w-full text-center space-y-12 lg:space-y-16 relative px-4 sm:px-6 animate-fade-in-up">
        {/* Status Badge */}
        <StatusBadge
          text="Available for new projects"
          variant="success"
          showPulse={true}
          className="my-8"
        />
        <div className="space-y-12">
          <h1 className="text-fluid-2xl lg:text-fluid-5xl font-light text-[var(--color-text)] leading-tight tracking-tight">
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
              <div className="text-fluid-lg font-medium text-[var(--color-text)]">
                50+
              </div>
              <div className="text-fluid-sm text-[var(--color-text-light)]">
                Projects Delivered
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[var(--color-border)]"></div>
            <div className="text-center">
              <div className="text-fluid-lg font-medium text-[var(--color-text)]">
                3+
              </div>
              <div className="text-fluid-sm text-[var(--color-text-light)]">
                Years Experience
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[var(--color-border)]"></div>
            <div className="text-center">
              <div className="text-fluid-lg font-medium text-[var(--color-text)]">
                100%
              </div>
              <div className="text-fluid-sm text-[var(--color-text-light)]">
                Client Satisfaction
              </div>
            </div>
          </div>

          <div className="w-24 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] mx-auto rounded-full"></div>
          <p className="text-fluid-lg lg:text-fluid-xl text-[var(--color-text-light)] font-normal leading-relaxed max-w-4xl mx-auto px-4">
            Full-stack developer specializing in modern web technologies. I
            transform complex ideas into elegant, scalable solutions that exceed
            expectations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 px-4">
          <Link
            to="/projects"
            className="group px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-secondary)] hover:bg-[var(--color-tertiary)] text-[var(--color-text)] font-medium rounded-full transition-all duration-500 border border-[var(--color-border)] hover:border-[var(--color-accent)] hover-lift min-w-[200px] lg:min-w-[240px] text-fluid-base relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          </Link>
          <Link
            to="/contact"
            className="group px-8 lg:px-12 py-4 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift min-w-[200px] lg:min-w-[240px] text-fluid-base"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="w-full">
          <div className="w-full text-center mb-16 lg:mb-20 px-4 sm:px-6">
            {/* Section badge */}
            <StatusBadge
              text="Featured Projects"
              variant="primary"
              showPulse={false}
              icon={<span className="text-lg">🔥</span>}
              className="mb-6"
            />

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

      {/* Latest Blog Posts Section */}
      {posts.length > 0 && (
        <section className="w-full">
          <div className="w-full text-center mb-16 lg:mb-20 px-4 sm:px-6">
            {/* Section badge */}
            <StatusBadge
              text="Latest Insights"
              variant="primary"
              showPulse={false}
              icon={
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z"
                  />
                </svg>
              }
              className="mb-6"
            />

            <h2 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] mb-6 tracking-tight">
              From the{" "}
              <span className="font-medium relative">
                Blog
                <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
              </span>
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-6"></div>
            <p className="text-fluid-base lg:text-fluid-lg text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
              Deep dives into modern web development, performance optimization,
              and design patterns that matter.
            </p>
          </div>
          <FeaturedPosts posts={posts} />
        </section>
      )}

      {/* About Preview Section */}
      <section className="w-full px-4 sm:px-6">
        <AboutPreview />
      </section>

      {/* Call to Action */}
      <section className="w-full text-center py-16 lg:py-20 px-4 sm:px-6">
        <div className="w-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-6 sm:p-12 lg:p-16 hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>

          {/* Floating elements */}
          {/* <div className="absolute top-6 right-6 w-8 h-8 border-2 border-[var(--color-accent)] rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-6 left-6 w-6 h-6 bg-[var(--color-accent)] rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div> */}

          <div className="relative z-10">
            {/* Response time badge */}
            <StatusBadge
              text="Usually responds within 24 hours"
              variant="info"
              showPulse={false}
              icon={
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
              }
              className="mb-8"
            />

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
              <Link
                to="/contact"
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
              </Link>

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

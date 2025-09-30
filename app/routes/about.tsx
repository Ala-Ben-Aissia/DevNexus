import { motion } from "motion/react";
import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  const title = "Dev Nexus | About";
  return [
    { title: "Dev Nexus | About" },
    {
      name: "description",
      content:
        "Learn more about Ala, a passionate developer dedicated to creating elegant, functional, and user-centered digital solutions.",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content:
        "Learn more about Ala, a passionate developer dedicated to creating elegant, functional, and user-centered digital solutions.",
    },
    {
      property: "og:url",
      content: "https://devnexus.vercel.app/about",
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content:
        "Learn more about Ala, a passionate developer dedicated to creating elegant, functional, and user-centered digital solutions.",
    },
  ];
}

export default function AboutPage() {
  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "Prisma", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
  ];

  const skills = [
    { name: "Frontend Development", level: 95 },
    { name: "Backend Development", level: 88 },
    { name: "UI/UX Design", level: 82 },
    { name: "Database Design", level: 85 },
  ];

  return (
    <div className="space-y-12 lg:space-y-20">
      {/* Header Section */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] tracking-tight">
          About{" "}
          <span className="font-medium text-[var(--color-text)] relative">
            Me
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
          Passionate about creating digital experiences that make a difference
        </p>
      </div>

      {/* Hero Section with Profile */}
      <div
        className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Profile Image */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img
              src="images/avatar.webp"
              alt="Ala's profile"
              className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-[var(--color-secondary)] shadow-2xl hover-lift transition-all duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-10 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10 space-y-6">
              <div>
                <h2 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-4 tracking-tight">
                  Hey, I'm <span className="font-medium">Ala</span> 👋
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-6"></div>
              </div>

              <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                I'm a passionate full-stack developer with a love for creating
                elegant, functional, and user-centered digital solutions. With
                years of experience in modern web technologies, I specialize in
                building applications that not only look great but also deliver
                exceptional user experiences.
              </p>

              <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                When I'm not coding, you'll find me exploring the latest tech
                trends, contributing to open source projects, or sharing
                knowledge with the developer community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-8 lg:p-12 hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
          <div className="relative z-10 text-center space-y-8">
            <div>
              <h3 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-4 tracking-tight">
                My <span className="font-medium">Mission</span>
              </h3>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent mx-auto"></div>
            </div>

            <p className="text-fluid-lg text-[var(--color-text-light)] leading-relaxed max-w-4xl mx-auto font-normal">
              To bridge the gap between complex technology and human needs by
              creating intuitive, accessible, and performant digital
              experiences. I believe that great software should feel effortless
              to use while being powerful under the hood.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="text-center mb-12">
          <h3 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-4 tracking-tight">
            Core <span className="font-medium">Skills</span>
          </h3>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl border border-[var(--color-border)] p-6 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[var(--color-text)] font-semibold text-fluid-base">
                    {skill.name}
                  </h4>
                  <span className="text-[var(--color-text-light)] text-fluid-sm font-medium">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-[var(--color-tertiary)] rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="text-center mb-12">
          <h3 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-4 tracking-tight">
            Tech <span className="font-medium">Stack</span>
          </h3>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-6"></div>
          <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
            Technologies I use to bring ideas to life
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] rounded-2xl px-6 py-4 hover-lift hover:border-[var(--color-accent)] transition-all duration-300 cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10 text-center">
                <p className="text-[var(--color-text)] font-semibold text-fluid-base">
                  {tech.name}
                </p>
                <p className="text-[var(--color-text-light)] text-fluid-sm mt-1 font-medium">
                  {tech.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="text-center py-16 lg:py-20 animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-12 lg:p-16 hover-lift relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
          <div className="relative z-10">
            <h3 className="text-fluid-2xl lg:text-fluid-4xl font-light text-[var(--color-text)] mb-6 tracking-tight">
              Let's Build Something <span className="font-medium">Amazing</span>
            </h3>
            <p className="text-fluid-base text-[var(--color-text-light)] mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              I'm always excited to work on new projects and collaborate with
              like-minded individuals. Whether you have an idea or need help
              with an existing project, let's make it happen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-full transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden min-w-[200px] justify-center"
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
              </a>
              <a
                href="/projects"
                className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift text-fluid-base min-w-[200px] justify-center"
              >
                <span>View My Work</span>
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

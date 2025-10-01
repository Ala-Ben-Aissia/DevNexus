import { motion } from "motion/react";
import type { Route } from "./+types/about";
import { Link } from "react-router";

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
    { name: "React", category: "Frontend", years: 3 },
    { name: "Next.js", category: "Framework", years: 2 },
    { name: "TypeScript", category: "Language", years: 3 },
    { name: "Tailwind CSS", category: "Styling", years: 2 },
    { name: "Node.js", category: "Backend", years: 3 },
    { name: "Prisma", category: "Database", years: 2 },
    { name: "PostgreSQL", category: "Database", years: 3 },
    { name: "MongoDB", category: "Database", years: 2 },
  ];

  const skills = [
    { name: "Frontend Development", level: 95, projects: 30 },
    { name: "Backend Development", level: 88, projects: 25 },
    { name: "UI/UX Design", level: 82, projects: 20 },
    { name: "Database Design", level: 85, projects: 22 },
  ];

  const journey = [
    {
      year: "2021",
      title: "Started My Journey",
      description:
        "Began learning web development with HTML, CSS, and JavaScript",
      icon: "🚀",
    },
    {
      year: "2022",
      title: "First Professional Project",
      description:
        "Delivered my first client project and discovered my passion for React",
      icon: "💼",
    },
    {
      year: "2023",
      title: "Full-Stack Mastery",
      description:
        "Expanded skills to backend development with Node.js and databases",
      icon: "⚡",
    },
    {
      year: "2024",
      title: "Current Focus",
      description:
        "Building scalable applications and mentoring other developers",
      icon: "🎯",
    },
  ];

  const funFacts = [
    { label: "Coffee cups per day", value: "☕ 4-6", icon: "☕" },
    { label: "Favorite coding time", value: "🌙 Night owl", icon: "🌙" },
    { label: "Debug method", value: "🧪 TDD advocate", icon: "🧪" },
    { label: "Inspiration source", value: "🎵 Lo-fi hip hop", icon: "🎵" },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-18 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center space-y-4 sm:space-y-6 animate-fade-in-up relative">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-300/20 dark:to-indigo-300/20 border border-purple-200 dark:border-purple-800 rounded-full text-xs sm:text-fluid-sm font-medium mb-5 sm:mb-8">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="whitespace-nowrap">
            Crafting digital solutions since 2021
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-fluid-6xl font-light text-[var(--color-text)] tracking-tight px-4">
          About{" "}
          <span className="font-medium text-[var(--color-text)] relative">
            Me
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] max-w-xl md:max-w-2xl mx-auto leading-relaxed font-normal px-4">
          Full-stack developer passionate about creating digital experiences
          that drive results and make a lasting impact
        </p>

        {/* Quick stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 pt-4">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-fluid-xl font-semibold text-[var(--color-text)]">
              3+
            </div>
            <div className="text-xs sm:text-sm md:text-fluid-sm text-[var(--color-text-light)]">
              Years Coding
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 sm:h-8 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-fluid-xl font-semibold text-[var(--color-text)]">
              50+
            </div>
            <div className="text-xs sm:text-sm md:text-fluid-sm text-[var(--color-text-light)]">
              Projects Built
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 sm:h-8 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-fluid-xl font-semibold text-[var(--color-text)]">
              8+
            </div>
            <div className="text-xs sm:text-sm md:text-fluid-sm text-[var(--color-text-light)]">
              Technologies
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Profile */}
      <div
        className="grid lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Profile Image */}
        <div className="lg:col-span-2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img
              src="images/avatar.webp"
              alt="Ala's profile"
              className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-[var(--color-secondary)] shadow-2xl hover-lift transition-all duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] p-6 sm:p-8 md:p-10 hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10 space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-fluid-3xl font-light text-[var(--color-text)] mb-3 sm:mb-4 tracking-tight">
                  Hey, I'm <span className="font-medium">Ala</span> 👋
                </h2>
                <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-4 sm:mb-6"></div>
              </div>

              <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                I'm a passionate full-stack developer who transforms complex
                ideas into elegant, scalable digital solutions. With expertise
                spanning modern web technologies, I specialize in creating
                applications that deliver measurable business value while
                providing exceptional user experiences.
              </p>

              <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
                My approach combines technical excellence with creative
                problem-solving, ensuring every project not only meets
                requirements but exceeds expectations. I believe in writing
                clean, maintainable code that stands the test of time.
              </p>

              {/* Download Resume Button */}
              <div className="pt-4 sm:pt-6">
                <Link
                  to="/resume.pdf"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-xl sm:rounded-2xl transition-all duration-300 hover-lift text-xs sm:text-sm md:text-fluid-sm relative overflow-hidden"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Resume
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Timeline */}
      {/* Journey Timeline */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-fluid-3xl font-light text-[var(--color-text)] mb-3 sm:mb-4 tracking-tight px-4">
            My <span className="font-medium">Journey</span>
          </h3>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] max-w-xl md:max-w-2xl mx-auto leading-relaxed font-normal px-4">
            From curious beginner to seasoned developer
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - Hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-30"></div>

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-row md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-8 ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-xl sm:rounded-2xl border border-[var(--color-border)] p-4 sm:p-5 md:p-6 hover-lift relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>

                    {/* Mobile icon - inside card at top right */}
                    <div className="md:hidden absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full flex items-center justify-center text-base border-2 border-[var(--color-primary)] shadow-lg z-20">
                      {item.icon}
                    </div>

                    <div className="relative z-10">
                      <div className="text-xs sm:text-sm md:text-fluid-sm text-[var(--color-text-light)] font-medium mb-1.5 sm:mb-2">
                        {item.year}
                      </div>
                      <h4 className="text-base sm:text-lg md:text-fluid-lg font-semibold text-[var(--color-text)] mb-2 sm:mb-3 pr-12 md:pr-0">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm md:text-fluid-sm text-[var(--color-text-light)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Timeline dot */}
                <div className="relative flex-shrink-0 hidden md:block">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full flex items-center justify-center text-lg sm:text-xl border-4 border-[var(--color-primary)] shadow-lg">
                    {item.icon}
                  </div>
                </div>

                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-fluid-3xl font-light text-[var(--color-text)] mb-3 sm:mb-4 tracking-tight px-4">
            Fun <span className="font-medium">Facts</span>
          </h3>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] max-w-xl md:max-w-2xl mx-auto leading-relaxed font-normal px-4">
            The human side behind the code
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {funFacts.map((fact, index) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-xl sm:rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 hover-lift relative overflow-hidden text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <div className="text-xl sm:text-2xl mb-2 sm:mb-3">
                  {fact.icon}
                </div>
                <div className="text-sm sm:text-base md:text-fluid-base font-semibold text-[var(--color-text)] mb-1.5 sm:mb-2">
                  {fact.value}
                </div>
                <div className="text-xs sm:text-sm md:text-fluid-sm text-[var(--color-text-light)]">
                  {fact.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-fluid-3xl font-light text-[var(--color-text)] mb-3 sm:mb-4 tracking-tight px-4">
            Core <span className="font-medium">Skills</span>
          </h3>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-xl sm:rounded-2xl border border-[var(--color-border)] p-4 sm:p-5 md:p-6 hover-lift relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h4 className="text-[var(--color-text)] font-semibold text-sm sm:text-base md:text-fluid-base">
                    {skill.name}
                  </h4>
                  <div className="text-right">
                    <span className="text-[var(--color-text-light)] text-xs sm:text-sm md:text-fluid-sm font-medium block">
                      {skill.level}%
                    </span>
                    <span className="text-[var(--color-text-muted)] text-[10px] sm:text-xs md:text-fluid-xs">
                      {skill.projects} projects
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[var(--color-tertiary)] rounded-full h-2.5 sm:h-3 relative overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] h-2.5 sm:h-3 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30 animate-shimmer"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl md:text-fluid-3xl font-light text-[var(--color-text)] mb-3 sm:mb-4 tracking-tight px-4">
            Tech <span className="font-medium">Stack</span>
          </h3>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] max-w-xl md:max-w-2xl mx-auto leading-relaxed font-normal px-4">
            Technologies I use to bring ideas to life
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 hover-lift hover:border-[var(--color-accent)] transition-all duration-300 cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
              <div className="relative z-10 text-center">
                <p className="text-[var(--color-text)] font-semibold text-sm sm:text-base md:text-fluid-base">
                  {tech.name}
                </p>
                <p className="text-[var(--color-text-light)] text-xs sm:text-sm md:text-fluid-sm mt-0.5 sm:mt-1 font-medium">
                  {tech.category}
                </p>
                <div className="text-[var(--color-text-muted)] text-[10px] sm:text-xs md:text-fluid-xs mt-1 sm:mt-2">
                  {tech.years} year{tech.years > 1 ? "s" : ""} exp
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="text-center py-12 sm:py-14 md:py-16 lg:py-20 animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl sm:rounded-3xl border border-[var(--color-border)] p-8 sm:p-10 md:p-12 lg:p-16 hover-lift relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
          <div className="relative z-10">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-full font-medium mb-6 sm:mb-8 text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="whitespace-nowrap">
                Available for new projects
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-fluid-3xl lg:text-fluid-4xl font-light text-[var(--color-text)] mb-4 sm:mb-5 md:mb-6 tracking-tight px-4">
              Ready to Work <span className="font-medium">Together?</span>
            </h3>
            <p className="text-sm sm:text-base md:text-fluid-base text-[var(--color-text-light)] mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xl md:max-w-2xl mx-auto leading-relaxed font-normal px-4">
              Whether you're looking to build something from scratch or enhance
              an existing project, I'm here to help bring your vision to life
              with clean code and thoughtful design.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 lg:gap-6 px-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-full transition-all duration-500 hover-lift text-sm sm:text-base md:text-fluid-base relative overflow-hidden min-w-full sm:min-w-[200px] justify-center"
              >
                <span className="relative z-10">Start a Project</span>
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1"
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
                className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift text-sm sm:text-base md:text-fluid-base min-w-full sm:min-w-[200px] justify-center"
              >
                <span>View My Work</span>
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="p-8 lg:p-16 flex flex-col md:flex-row items-center gap-12 lg:gap-16 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] hover-lift relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
      <div className="relative z-10 flex-shrink-0">
        <div className="relative">
          <img
            src="/images/avatar.webp"
            alt="profile"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-[var(--color-border)] shadow-lg gpu-accelerated"
            loading="lazy"
          />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left relative z-10 space-y-6">
        <h2 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] tracking-tight">
          👋 About{" "}
          <span className="font-medium relative">
            Me
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-30"></div>
          </span>
        </h2>
        <p className="text-[var(--color-text-light)] text-fluid-base lg:text-fluid-lg leading-relaxed max-w-2xl font-normal">
          I'm Ala — a passionate developer and tech enthusiast dedicated to
          creating elegant digital solutions and sharing knowledge with the
          developer community.
        </p>
        <Link
          to="/about"
          className="group inline-flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-text-light)] transition-all duration-500 text-fluid-base border-b border-[var(--color-border)] hover:border-[var(--color-accent)] hover-lift"
        >
          <span>Learn More About Me</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;

export default function Hero({ name, text }: { name: string; text: string }) {
  return (
    <section className="min-h-[22vh] flex items-center justify-center px-4 lg:px-6 animate-fade-in-up">
      <div className="max-w-6xl mx-auto text-center space-y-12 lg:space-y-16">
        <div className="space-y-8 lg:space-y-12">
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-[var(--color-text)] tracking-tight leading-tight">
            Hey, I'm{" "}
            <span className="font-medium text-[var(--color-text)] relative">
              {name}
              <div className="absolute -bottom-1 lg:-bottom-2 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-30"></div>
            </span>
          </h1>
          {/* <div className="w-16 lg:w-32 h-[1px] bg-[var(--color-border)] mx-auto"></div> */}
          <p className="text-base sm:text-md md:text-lg lg:text-xl text-[var(--color-text-light)] font-normal leading-relaxed max-w-4xl mx-auto px-4">
            {text}
          </p>
        </div>

        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8">
          <NavLink
            to="/projects"
            className="group px-8 lg:px-12 py-3 lg:py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-tertiary)] text-[var(--color-text)] font-medium rounded-full transition-all duration-300 border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:shadow-lg hover:-translate-y-1 min-w-[180px] lg:min-w-[200px] text-base lg:text-lg"
          >
            View Projects
          </NavLink>

          <NavLink
            to="/contact"
            className="group px-8 lg:px-12 py-3 lg:py-4 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-300 min-w-[180px] lg:min-w-[200px] text-base lg:text-lg"
          >
            Get In Touch
          </NavLink>
        </div> */}
      </div>
    </section>
  );
}

import { Link } from "react-router";

export default function Button({
  text,
  to,
}: {
  text: string;
  to: `/${string}`;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift text-sm sm:text-base whitespace-nowrap flex-shrink-0"
    >
      <span>{text}</span>
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
  );
}

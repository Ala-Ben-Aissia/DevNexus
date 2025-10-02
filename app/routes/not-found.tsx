import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-bg)] overflow-hidden">
      <div className="text-center space-y-6 max-w-md w-full px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-[var(--color-text)]">
          404
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-light)]">
          The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[var(--color-tertiary)] hover:bg-[var(--color-accent)] text-[var(--color-text)] font-medium rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

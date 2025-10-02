"use client";
import { motion } from "motion/react";
import { useTheme } from "~/contexts/ThemeContext";
import { useState, useEffect } from "react";

export default function ThemeToggleSimple() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] w-12 h-12 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-3 rounded-2xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 hover-lift focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>

      <div className="relative w-6 h-6 overflow-hidden">
        {/* Sun Icon */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-[var(--color-text)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 180,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <path
            d="m12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            strokeWidth="2"
          />
        </motion.svg>

        {/* Moon Icon */}
        <motion.svg
          className="absolute inset-0 w-6 h-6 text-[var(--color-text)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -180,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            strokeWidth="2"
          />
        </motion.svg>
      </div>
    </button>
  );
}

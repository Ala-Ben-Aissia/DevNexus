import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import ThemeToggleSimple from "./ThemeToggleSimple";

type Path = `/${string}`;
type NavLinks = Array<{ to: Path; label: string }>;

const navLinks: NavLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-sm bg-gradient-to-r from-[var(--color-primary)]/70 via-[var(--color-primary)]/50 to-[var(--color-primary)]/70 border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] supports-[backdrop-filter]:backdrop-saturate-150 mb-12">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 transition-all duration-200 hover:scale-[1.02]"
        >
          <div className="relative w-10 h-10">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:rotate-180"
              style={{ transformOrigin: "center" }}
            >
              <path
                d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                fill="none"
                stroke="lightgray"
                strokeWidth="5"
                className="text-[var(--color-accent)] transition-colors duration-300"
              />
            </svg>

            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="25%"
                  y2="50%"
                >
                  <stop offset="0%" style={{ stopColor: "currentColor" }} />
                  <stop offset="100%" style={{ stopColor: "currentColor" }} />
                </linearGradient>
              </defs>
              <path
                d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z"
                fill="url(#logoGradient)"
                className="transition-all duration-300 group-hover:opacity-80"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110">
                A
              </span>
            </div>

            <div className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-[var(--color-text)] tracking-tight transition-colors duration-300">
              DevNexus
            </span>
            <span className="text-[10px] font-medium text-[var(--color-text-light)] tracking-wider uppercase transition-colors duration-300">
              Portfolio
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `relative text-fluid-base transition-all duration-500 ${
                  isActive
                    ? "font-semibold text-[var(--color-text)]"
                    : "text-[var(--color-text-light)] hover:text-[var(--color-text)]"
                }`
              }
            >
              <span className="relative z-10">{l.label}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></div>
            </NavLink>
          ))}

          <div className="ml-4">
            <ThemeToggleSimple />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="sm:hidden flex items-center gap-3">
          <ThemeToggleSimple />
          <button
            className="text-[var(--color-text)] text-fluid-xl cursor-pointer hover:text-[var(--color-text-light)] transition-all duration-300 hover-lift"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div
                className={`absolute transition-all duration-300 ${
                  menuOpen ? "rotate-45" : ""
                }`}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`sm:hidden absolute left-0 right-0 bg-gradient-to-b from-[var(--color-primary)]/90 to-[var(--color-primary)]/70 backdrop-blur-2xl border-t border-white/10 transition-all duration-500 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8 text-fluid-lg">
          {navLinks.map((l, index) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `transition-all duration-500 relative text-fluid-lg ${
                  isActive
                    ? "font-semibold text-[var(--color-text)]"
                    : "text-[var(--color-text-light)] hover:text-[var(--color-text)]"
                }`
              }
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

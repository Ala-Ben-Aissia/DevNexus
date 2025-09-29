import { NavLink } from "react-router";
import { FaBars, FaDev, FaTimes } from "react-icons/fa";
import { useState } from "react";

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

  const base =
    "text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-500 relative group";
  const active =
    "font-medium text-[var(--color-text)] transition-all duration-500 relative";

  return (
    <nav className="bg-[var(--color-primary)]/95 backdrop-blur-xl sticky top-0 z-50 border-b border-[var(--color-border)] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 text-[var(--color-text)] hover:text-[var(--color-text)] transition-all duration-500 text-fluid-lg hover-lift"
        >
          <FaDev className="text-fluid-xl text-[var(--color-text)] transition-transform duration-300 group-hover:rotate-12" />
          <span className="tracking-wide font-normal relative">
            Ala Ben Aissia
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full"></div>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-12">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `transition-all duration-500 text-fluid-base relative ${
                  isActive ? active : base
                }`
              }
            >
              <span className="relative z-10">{l.label}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></div>
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-[var(--color-text)] text-fluid-xl cursor-pointer hover:text-[var(--color-text-light)] transition-all duration-300 hover-lift"
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

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden absolute left-0 right-0 bg-[var(--color-primary)]/98 backdrop-blur-xl border-t border-[var(--color-border)] transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-8 text-fluid-lg">
          {navLinks.map((l, index) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `transition-all duration-500 relative group ${
                  isActive ? active : base
                }`
              }
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="relative z-10">{l.label}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"></div>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

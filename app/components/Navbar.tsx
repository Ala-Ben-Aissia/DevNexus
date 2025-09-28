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

  const base = "hover:text-blue-200 transition";
  const active = "text-blue-400 font-semibold";

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-bold text-blue-400 hover:scale-105 transition-transform duration-400 text-base sm:text-lg"
        >
          <FaDev className="text-blue-500 text-lg sm:text-lg" />
          <span className="tracking-wide sm:text-lg text-md text-blue-100">
            Ala Ben Aissia
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) => `${isActive ? active : base} `}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-blue-500 text-xl cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Top Dropdown Menu */}
      <div
        className={`sm:hidden absolute left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-5 py-6 text-base sm:text-lg">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) => `${base} ${isActive ? active : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

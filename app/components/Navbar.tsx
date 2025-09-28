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
    "text-gray-300 hover:text-blue-300 transition-colors duration-300";
  const active =
    "font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 transition-colors duration-300";

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-lg after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-blue-800/30 after:via-purple-800/30 after:to-blue-800/30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="group flex items-center gap-2 font-bold text-blue-400 hover:scale-105 transition-transform duration-300 text-base sm:text-lg"
        >
          <FaDev className="text-blue-500 text-lg sm:text-lg" />
          <span className="tracking-wide sm:text-lg text-md text-blue-100 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500">
            Ala Ben Aissia
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors duration-300 ${isActive ? active : base}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-blue-500 text-xl cursor-pointer hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Top Dropdown Menu */}
      <div
        className={`sm:hidden absolute left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-5 py-6 text-base sm:text-lg">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors duration-300 ${
                  isActive ? active : base
                } hover:${base}`
              }
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

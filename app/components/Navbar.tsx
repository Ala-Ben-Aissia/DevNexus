import { NavLink } from "react-router";
import { FaDev } from "react-icons/fa";

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
  const base = "transition hover:text-blue-300";
  const active = "text-blue-400 font-semibold";

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaDev className="text-blue-400 text-xl" />
          <span>Ala Ben Aissia</span>
        </NavLink>
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => {
                  return isActive ? active : base;
                }}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

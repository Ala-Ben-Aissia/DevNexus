import { NavLink } from "react-router";

export default function Hero({ name, text }: { name: string; text: string }) {
  return (
    <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-4">Hey, I'm {name} 👋</h2>
      <p className="text-lg text-gray-400 mx-w-2xl mx-auto mb-6">{text}</p>
      <div className="flex justify-center gap-4">
        <NavLink
          to="/projects"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          View projects
        </NavLink>
        <NavLink
          to="/contact"
          className="border border-blue-500 text-blue-400 px-6 py-2 rounded hove:bg-blue-600 hover:text-blue-200"
        >
          Contact me
        </NavLink>
      </div>
    </header>
  );
}

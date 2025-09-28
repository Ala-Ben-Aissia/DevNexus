import { Link } from "react-router";
import type { Project } from "~/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.id}`}>
      <div
        key={project.id}
        className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 border border-gray-700 hover:border-purple-400/50"
      >
        <div className="aspect-[16/9] w-full overflow-hidden relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
              {project.category}
            </span>
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(project.date))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

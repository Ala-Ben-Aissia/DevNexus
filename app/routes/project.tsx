import type { Project } from "~/types";
import type { Route } from "./+types/project";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const id = params.id;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`);
    if (!res.ok) {
      throw new Response("Error loading projects", { status: res.status });
    }
    const project = (await res.json()) as Project;
    if (!project) {
      throw new Response("Not Found", { status: 404 });
    }
    return project;
  } catch (error) {
    throw new Response("Error loading projects", { status: 500 });
  }
}

export function hydrateFallback() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-spin">
            <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
        </div>
        <h1 className="text-2xl text-white font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
          Loading Project...
        </h1>
      </div>
    </div>
  );
}

export default function Project({ loaderData }: Route.ComponentProps) {
  const project = loaderData;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back Button */}
      <div className="px-4 py-4 border-t border-gray-700">
        <a
          href="/projects"
          className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
        >
          <div className="w-10 h-10 bg-gray-800 group-hover:bg-gray-700 border border-gray-600 group-hover:border-gray-500 rounded-lg flex items-center justify-center transition-all duration-300">
            ←
          </div>
          <span className="font-medium">Back to Projects</span>
        </a>
      </div>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-purple-300 text-sm rounded-full border border-purple-500/50">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-300 text-sm rounded-full border border-yellow-500/50">
                  ⭐ Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Project Overview
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Technologies/Features Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-white">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mock features - replace with actual project data */}
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Modern Design</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">Responsive Layout</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Fast Performance</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">User Friendly</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-white">
                Project Info
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Date</label>
                  <p className="text-white font-medium">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Category</label>
                  <p className="text-white font-medium capitalize">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1"
              >
                🚀 View Live Project
              </a>

              <button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300">
                📋 Copy Link
              </button>
            </div>

            {/* Share Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-white">
                Share Project
              </h3>
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 p-3 rounded-lg transition-colors duration-300">
                  📘
                </button>
                <button className="flex-1 bg-gray-600/20 hover:bg-gray-600/30 border border-gray-500/30 text-gray-300 p-3 rounded-lg transition-colors duration-300">
                  🐦
                </button>
                <button className="flex-1 bg-blue-700/20 hover:bg-blue-700/30 border border-blue-400/30 text-blue-300 p-3 rounded-lg transition-colors duration-300">
                  💼
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

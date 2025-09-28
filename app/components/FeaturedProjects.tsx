import { AnimatePresence, motion } from "motion/react";
import { Link, NavLink } from "react-router";
import type { Project } from "~/types";

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Image with Premium Overlay */}
      <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm mb-6 border border-gray-700/50 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Glassmorphism Overlay on Hover */}
        <AnimatePresence>
          {true && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content with Enhanced Spacing */}
      <div className="space-y-6 p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-lg shadow-black/10">
        <div className="flex items-center justify-between">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 text-purple-200 text-xs rounded-full border border-purple-500/20 font-semibold tracking-wider uppercase shadow-md shadow-purple-500/10 backdrop-blur-sm">
            {project.category}
          </span>
          <time className="text-sm text-gray-400 font-light italic">
            {new Date(project.date).getFullYear()}
          </time>
        </div>

        <h3 className="text-3xl md:text-4xl font-extralight text-white leading-tight group-hover:text-gradient-blue transition-all duration-500 break-words">
          {project.title}
        </h3>

        <p className="text-gray-300 leading-loose text-lg opacity-90">
          {project.description}
        </p>

        <div className="flex items-center text-gray-400 group-hover:text-purple-300 transition-colors duration-500">
          <Link to={`/projects/${project.id}`}>
            <span className="text-base font-semibold tracking-wide">
              Explore Project
            </span>{" "}
            <motion.span
              className="ml-3 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedProjects({
  featuredProjects,
}: {
  featuredProjects: Project[];
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black mt-20 overflow-hidden">
      {
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-8 leading-tight">
                Curated{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent font-semibold tracking-tight">
                  Projects
                </span>
              </h2>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-blue-500/60 mx-auto rounded-full shadow-inner"></div>
            </motion.div>

            {/* Enhanced Grid with Stagger */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {featuredProjects.slice(0, 4).map((featuredProject, index) => (
                <FeaturedProject
                  key={featuredProject.id}
                  project={featuredProject}
                  index={index}
                />
              ))}
            </div>

            {featuredProjects.length > 4 && (
              <div className="text-center mt-24">
                <NavLink
                  to="/projects"
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-900/50 text-gray-200 hover:text-white rounded-2xl border border-gray-600/30 hover:border-purple-500/40 backdrop-blur-md shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 font-semibold tracking-wide overflow-hidden"
                >
                  <span>Discover All</span>
                  <motion.span
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                  {/* Premium Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </NavLink>
              </div>
            )}
          </div>
        </section>
      }
    </div>
  );
}

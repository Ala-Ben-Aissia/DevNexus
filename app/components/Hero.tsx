import { NavLink } from "react-router";

export default function Hero({ name, text }: { name: string; text: string }) {
  return (
    <section className="min-h-[30vh] mt-20 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-12 lg:space-y-16">
        <div className="space-y-8 lg:space-y-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight">
            Hey, I'm{" "}
            <span className="font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {name}
            </span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mx-auto"></div>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
            {text}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-12">
          <NavLink
            to="/projects"
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1 min-w-[160px]"
          >
            View Projects
          </NavLink>

          <NavLink
            to="/contact"
            className="group px-8 py-4 text-white font-medium rounded-full border border-gray-600 hover:border-purple-400/50 hover:bg-gray-800/50 transition-all duration-300 min-w-[160px]"
          >
            Get In Touch
          </NavLink>
        </div>
      </div>
    </section>
  );
}

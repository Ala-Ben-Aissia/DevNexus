export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
      <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
        <img
          src="images//avatar.webp"
          alt="profile"
          className="md:w-40 md:h-40 w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-[0_0_30px_5px_rgba(59,130,246,0.75),0_0_50px_10px_rgba(59,130,246,0.4)]"
        />
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Hey, I'am Ala 👋</h1>
      <p className="text-gray-300 text-lg mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam magni, a
        praesentium velit veniam sed eum corporis officia consequatur .
        Molestiae fugiat ducimus impedit perspiciatis nostrum ipsum explicabo
        facere, aut architecto!
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-white mb-4">My mission</h2>
        <p className="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam magni,
          a praesentium velit veniam sed eum corporis officia consequatur .
          Molestiae fugiat ducimus impedit perspiciatis nostrum ipsum explicabo
          facere, aut architecto!
        </p>
      </div>
      <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
      <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
        {[
          "React",
          "Next.js",
          "Tailwind",
          "TypeScript",
          "Prisma",
          "Node.js",
          "MongoDB",
          "PostgreSQL",
        ].map((t) => (
          <li
            key={t}
            className="px-4 py-2 bg-gray-700 rounded-md border border-gray-700"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

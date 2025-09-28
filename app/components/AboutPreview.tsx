import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="mt-12 p-10 flex flex-col md:flex-row items-center gap-8 bg-gray-900">
      <img
        src="/images/avatar.webp"
        alt="profile"
        className="md:w-40 md:h-40 w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-[0_0_30px_2px_rgba(250,204,21,0.75),0_0_20px_1px_rgba(250,204,21,0.4)]"
      />
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">👋 About Me</h2>
        <p className="text-gray-200 mb-4 max-w 4xl">
          I’m Brad — a self-taught developer and educator passionate about
          building friendly digital experiences and helping others grow into
          confident modern devs.
        </p>
        <Link
          to="/about"
          className="inline-block text-blue-400 hover:underline text-sm"
        >
          Learn More About Me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;

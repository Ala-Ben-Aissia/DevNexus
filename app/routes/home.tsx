import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Nexus | Welcome" },
    {
      name: "description",
      content:
        "DevNexus blends a software developer portfolio with an ever-growing blog of coding tips and best practices. Discover projects and level up your skills in modern web development.",
    },
  ];
}

export default function HomePage() {
  return <h2 className="text-3xl font-bold text-white mb-2">Home page</h2>;
}

import Hero from "~/components/Hero";
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
  return (
    <section>
      <Hero
        name="Ala"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Error dolor delectus laboriosam nesciunt libero, rerum culpa ducimus iste dolorum qui eius velit excepturi aliquam nostrum nihil iusto atque commodi maxime!"
      />
    </section>
  );
}

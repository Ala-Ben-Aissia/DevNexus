import Hero from "~/components/Hero";
import MainLayout from "./main";

export default function HomeLayout() {
  return (
    <>
      <Hero
        name="Ala"
        text="Full-stack developer passionate about crafting exceptional digital experiences. I transform complex ideas into elegant, scalable solutions that drive real business value and deliver measurable results."
      />
      <MainLayout />
    </>
  );
}

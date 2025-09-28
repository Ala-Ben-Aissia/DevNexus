import Hero from "~/components/Hero";
import MainLayout from "./main";

export default function HomeLayout() {
  return (
    <>
      <Hero
        name="Ala"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, aliquam architecto perspiciatis omnis assumenda officia commodi dicta vel repellendus. Cumque ad enim voluptates fugiat rerum! Eius incidunt architecto nihil esse!"
      />
      <MainLayout />
    </>
  );
}

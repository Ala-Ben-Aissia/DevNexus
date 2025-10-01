import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 my-6">
      <Outlet />
    </section>
  );
}

import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/layouts/home.tsx", [index("routes/home.tsx")]),
  layout("routes/layouts/main.tsx", [
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("projects", "routes/projects.tsx"),
    route("projects/:id", "routes/project.tsx"),
    route("blog", "routes/blog.tsx"),
  ]),
] satisfies RouteConfig;

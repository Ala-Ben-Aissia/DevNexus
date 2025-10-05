import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar from "./components/Navbar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Post, Project } from "./types";
import { ThemeProvider } from "./contexts/ThemeContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dev Nexus" },
    {
      name: "description",
      content:
        "DevNexus blends a software developer portfolio with an ever-growing blog of coding tips and best practices. Discover projects and level up your skills in modern web development.",
    },
  ];
}

type Data = { projects: Project[]; posts: Post[] };

const dataCache = { projects: [], posts: [] } as Data;

async function fetchData() {
  if (dataCache.posts.length && dataCache.projects.length) {
    return dataCache;
  }
  try {
    const [projects, posts] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/projects?populate=*`).then<
        Promise<{ data: Project[] }>
      >((res) => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/posts`).then<
        Promise<{ data: Post[] }>
      >((res) => res.json()),
    ]);

    dataCache.projects = projects.data.map((p) => {
      const imageUrl = p.image?.url ? `${p.image.url}` : "/images/no-image.png";
      const imageUrlLight = p.imageLight?.url
        ? `${p.imageLight.url}`
        : "/images/no-image-light.jpg";
      return {
        ...p,
        image: {
          url: imageUrl,
        },
        imageLight: {
          url: imageUrlLight,
        },
      };
    });
    dataCache.posts = posts.data;

    return dataCache;
  } catch (error) {
    console.error("Failed to fetch data", { error });
    return { posts: [], projects: [] };
  }
}

export async function loader({}: Route.LoaderArgs) {
  const data = await fetchData();
  return data;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="scroll-smooth">
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <Navbar />
          <main className="w-full">{children}</main>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

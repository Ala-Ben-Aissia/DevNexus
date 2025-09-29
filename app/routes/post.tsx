import type { PostMeta } from "~/types";
import type { Route } from "./+types/post";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";

export async function loader({
  params,
  request,
}: Route.LoaderArgs): Promise<{ markdown: string; postMeta: PostMeta }> {
  const { slug } = params;
  try {
    const url = new URL("/posts_meta.json", request.url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Posts Metas: ${response.statusText}`);
    }
    const postsMeta = (await response.json()) as PostMeta[];
    const postMeta = postsMeta.find((p) => p.slug === slug);
    if (!postMeta) {
      throw new Error("PostMeta not found");
    }
    const postMdPreview = await import(`../posts/${postMeta.slug}.md?raw`);
    return { markdown: postMdPreview.default, postMeta };
  } catch (error) {
    console.error("Error loading Posts Metas:", error);
    throw new Error("Failed to fetch Posts Metas");
  }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { markdown, postMeta } = loaderData;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <div className="py-4 border-t dark:border-gray-700">
        <Link
          to="/blog"
          className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 group"
        >
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 group-hover:bg-gray-300 group-hover:dark:bg-gray-700 border border-gray-400 dark:border-gray-600 group-hover:border-gray-500 rounded-lg flex items-center justify-center transition-all duration-300">
            ←
          </div>
          <span className="font-medium">Back to Posts</span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-2">{postMeta.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(postMeta.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="max-w-none mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}

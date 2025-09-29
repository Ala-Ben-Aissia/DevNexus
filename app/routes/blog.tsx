import type { PostMeta } from "~/types";
import type { Route } from "./+types/blog";
import PostCard from "~/components/PostCard";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<PostMeta[]> {
  try {
    const url = new URL("/posts_meta.json", request.url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const posts = loaderData;

  if (posts.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">📝</p>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No posts yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Check back soon for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Thoughts, ideas, and insights on web development and design
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post_meta={post} />
        ))}
      </div>

      {/* Optional: Load More Section */}
      {/* Uncomment when pagination is implemented */}
      {/*
      <div className="mt-16 flex justify-center">
        <button className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
          Load more posts
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      */}
    </div>
  );
}

import { Link } from "react-router";
import type { PostMeta } from "~/types";

export default function PostCard({ post_meta }: { post_meta: PostMeta }) {
  return (
    <article
      key={post_meta.id}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 dark:bg-gray-800 dark:ring-gray-700"
    >
      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Date Badge */}
        <time
          dateTime={post_meta.date}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {new Date(post_meta.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {/* Title */}
        <h2 className="mb-3 text-xl font-semibold leading-tight text-gray-900 dark:text-white">
          {post_meta.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-gray-600 dark:text-gray-300 line-clamp-3">
          {post_meta.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          to={`/blog/${post_meta.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          Read more
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

import type { Post } from "~/types";
import Button from "./Button";

export default function PostCard({ post: post }: { post: Post }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] transition-all duration-500 hover-lift hover:border-[var(--color-accent)] gpu-accelerated">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

      <div className="relative z-10 p-8 lg:p-10">
        {/* Date Badge */}
        <div className="flex items-center gap-3 mb-6">
          <time
            dateTime={post.date}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-tertiary)] text-[var(--color-text-light)] text-fluid-sm font-medium rounded-full border border-[var(--color-border)] transition-all duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-text)]"
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
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] leading-tight tracking-tight mb-4 lg:mb-6 group-hover:text-[var(--color-text)] transition-colors duration-300">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed mb-6 lg:mb-8 line-clamp-3 font-normal">
          {post.excerpt}
        </p>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent mb-6 lg:mb-8 group-hover:from-[var(--color-accent)] transition-colors duration-300"></div>

        {/* Read More Link */}
        <Button text="Read Article" to={`/blog/${post.documentId}`} />
      </div>

      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl shadow-lg shadow-[var(--color-accent)]/10"></div>
      </div>
    </article>
  );
}

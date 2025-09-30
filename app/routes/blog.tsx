import type { PostMeta } from "~/types";
import type { Route } from "./+types/blog";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import { usePage } from "~/hooks/usePage";
import { motion, AnimatePresence } from "motion/react";

export function meta({}: Route.MetaArgs) {
  const title = "Dev Nexus | Blog";
  return [
    { title: "Dev Nexus | Blog" },
    {
      name: "description",
      content:
        "Thoughts, ideas, and insights on web development, design, and technology trends.",
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content:
        "Thoughts, ideas, and insights on web development, design, and technology trends.",
    },
    {
      property: "og:url",
      content: "https://devnexus.vercel.app/blog",
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content:
        "Thoughts, ideas, and insights on web development, design, and technology trends.",
    },
  ];
}

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
  let posts = loaderData;
  posts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const {
    items: displayedPosts,
    totalPages,
    currentPage,
    onPageChange,
    goNext,
    goPrev,
  } = usePage({
    list: posts,
    perPage: 6,
  });

  if (posts.length === 0) {
    return (
      <div className="space-y-12 lg:space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-6 animate-fade-in-up">
          <h1 className="text-fluid-4xl lg:text-fluid-6xl font-thin text-[var(--color-text)] tracking-tight">
            My{" "}
            <span className="font-normal text-[var(--color-text)] relative">
              Blog
              <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
            </span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
          <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed">
            Thoughts, ideas, and insights on web development, design, and
            technology trends.
          </p>
        </div>

        {/* Empty State */}
        <div
          className="flex flex-col items-center justify-center py-20 lg:py-32 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-16 lg:p-20 text-center hover-lift relative overflow-hidden max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10">
              <div className="text-8xl lg:text-9xl mb-8 opacity-20">✍️</div>
              <h2 className="text-fluid-2xl lg:text-fluid-3xl font-thin text-[var(--color-text)] mb-4 tracking-tight">
                No posts <span className="font-normal">yet</span>
              </h2>
              <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed">
                I'm working on some exciting content. Check back soon for new
                articles and insights!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 lg:space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <h1 className="text-fluid-4xl lg:text-fluid-6xl font-thin text-[var(--color-text)] tracking-tight">
          My{" "}
          <span className="font-normal text-[var(--color-text)] relative">
            Blog
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed">
          Thoughts, ideas, and insights on web development, design, and
          technology trends.
        </p>
      </div>

      {/* Stats Bar */}
      <div
        className="flex justify-center animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="inline-flex items-center gap-6 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] px-8 py-4 rounded-full border border-[var(--color-border)] hover-lift">
          <div className="flex items-center gap-2 text-[var(--color-text-light)] text-fluid-sm">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
            <span className="font-medium">
              {posts.length} Article{posts.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="w-px h-6 bg-[var(--color-border)]"></div>
          <div className="flex items-center gap-2 text-[var(--color-text-light)] text-fluid-sm">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z"
              />
            </svg>
            <span className="font-medium">Latest Insights</span>
          </div>
        </div>
      </div>

      {/* Blog Posts - Vertical Layout */}
      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="space-y-8 lg:space-y-12"
          style={{ animationDelay: "0.2s" }}
        >
          {displayedPosts.map((post, index) => (
            <motion.div
              layout
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <PostCard post_meta={post} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex justify-center mt-16 lg:mt-20 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            goNext={goNext}
            goPrev={goPrev}
          />
        </div>
      )}

      {/* Call to Action */}
      <div
        className="text-center py-16 lg:py-20 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-12 lg:p-16 hover-lift relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
          <div className="relative z-10">
            <h3 className="text-fluid-2xl lg:text-fluid-4xl font-thin text-[var(--color-text)] mb-6 tracking-tight">
              Stay <span className="font-normal">Connected</span>
            </h3>
            <p className="text-fluid-base text-[var(--color-text-light)] mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
              Get notified when I publish new articles. Join the community of
              developers and designers who stay ahead of the curve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-full transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden min-w-[200px] justify-center"
              >
                <span className="relative z-10">Get in Touch</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </a>
              <a
                href="/projects"
                className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 text-[var(--color-text)] font-medium rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-secondary)] transition-all duration-500 hover-lift text-fluid-base min-w-[200px] justify-center"
              >
                <span>View Projects</span>
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

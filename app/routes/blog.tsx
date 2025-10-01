import type { PostMeta } from "~/types";
import type { Route } from "./+types/blog";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import { usePage } from "~/hooks/usePage";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import StatusBadge from "~/components/StatusBadge";

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  posts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get unique categories
  const categories = ["All", ...new Set(posts.map((post) => "Tech"))]; // Mock categories

  // Filter posts by category and search query
  const filteredPosts = posts.filter((post) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "All" || selectedCategory === "Tech";

    // Search filter
    const searchMatch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const {
    items: displayedPosts,
    totalPages,
    currentPage,
    onPageChange,
    goNext,
    goPrev,
  } = usePage({
    list: filteredPosts,
    perPage: 6,
  });

  if (posts.length === 0) {
    return (
      <div className="space-y-12 lg:space-y-16">
        {/* Header Section */}
        <div className="text-center space-y-6 animate-fade-in-up relative">
          {/* Writing status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-full text-blue-700 dark:text-blue-300 text-fluid-sm font-medium mb-4">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            Content coming soon
          </div>

          <h1 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] tracking-tight">
            Developer{" "}
            <span className="font-medium text-[var(--color-text)] relative">
              Insights
              <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
            </span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
          <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
            Deep dives into modern web development, design patterns, and the
            latest technologies shaping the future of digital experiences.
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
              <h2 className="text-fluid-2xl lg:text-fluid-3xl font-light text-[var(--color-text)] mb-4 tracking-tight">
                No posts <span className="font-medium">yet</span>
              </h2>
              <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal">
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
      <div className="text-center space-y-6 animate-fade-in-up relative">
        {/* Publishing status badge */}
        <StatusBadge text="Publishing weekly insights" variant="success" />

        <h1 className="text-fluid-4xl lg:text-fluid-6xl font-light text-[var(--color-text)] tracking-tight">
          Developer{" "}
          <span className="font-medium text-[var(--color-text)] relative">
            Insights
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[var(--color-accent)] opacity-20"></div>
          </span>
        </h1>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mx-auto"></div>
        <p className="text-fluid-base text-[var(--color-text-light)] max-w-2xl mx-auto leading-relaxed font-normal">
          Deep dives into modern web development, design patterns, and the
          latest technologies shaping the future of digital experiences.
        </p>

        {/* Blog stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <div className="text-center">
            <div className="text-fluid-lg font-semibold text-[var(--color-text)]">
              {posts.length}
            </div>
            <div className="text-fluid-sm text-[var(--color-text-light)]">
              Articles
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-fluid-lg font-semibold text-[var(--color-text)]">
              5 min
            </div>
            <div className="text-fluid-sm text-[var(--color-text-light)]">
              Avg read time
            </div>
          </div>
          <div className="hidden sm:block w-px h-6 bg-[var(--color-border)]"></div>
          <div className="text-center">
            <div className="text-fluid-lg font-semibold text-[var(--color-text)]">
              Weekly
            </div>
            <div className="text-fluid-sm text-[var(--color-text-light)]">
              New content
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className="max-w-2xl mx-auto animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-[var(--color-text-light)] group-focus-within:text-[var(--color-accent)] transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onPageChange(1); // Reset to first page on search
            }}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border-2 border-[var(--color-border)] rounded-2xl text-[var(--color-text)] placeholder-[var(--color-text-light)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-0 transition-all duration-300 text-fluid-base hover:border-[var(--color-accent)] hover:shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                onPageChange(1);
              }}
              className="absolute inset-y-0 right-4 flex items-center text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-colors duration-300"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Search results count */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-center text-fluid-sm text-[var(--color-text-light)]"
          >
            Found {filteredPosts.length} article
            {filteredPosts.length !== 1 ? "s" : ""} matching "{searchQuery}"
          </motion.div>
        )}
      </div>

      {/* Categories Filter */}
      <div
        className="flex flex-wrap justify-center gap-3 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              onPageChange(1);
            }}
            className={`px-6 py-3 text-fluid-sm rounded-full cursor-pointer transition-all duration-500 border hover-lift relative overflow-hidden ${
              selectedCategory === category
                ? "bg-[var(--color-accent)] text-[var(--color-text)] border-[var(--color-accent)] shadow-md"
                : "bg-[var(--color-secondary)] text-[var(--color-text-light)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-tertiary)]"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {category === "All" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              )}
              {category === "Tech" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              )}
              {category}
            </span>
            {selectedCategory === category && (
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-20"></div>
            )}
          </button>
        ))}
      </div>

      {/* No results message */}
      {filteredPosts.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 animate-fade-in-up"
        >
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-3xl border border-[var(--color-border)] p-12 lg:p-16 text-center hover-lift relative overflow-hidden max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-6 opacity-20">🔍</div>
              <h3 className="text-fluid-2xl font-light text-[var(--color-text)] mb-4 tracking-tight">
                No articles <span className="font-medium">found</span>
              </h3>
              <p className="text-fluid-base text-[var(--color-text-light)] leading-relaxed font-normal mb-6">
                No articles match your search for "
                <strong>{searchQuery}</strong>". Try different keywords or
                browse all articles.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-2xl transition-all duration-300 hover-lift text-fluid-sm"
              >
                Clear Search
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Newsletter Signup */}
      {filteredPosts.length > 0 && (
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-2xl border border-[var(--color-border)] p-6 hover-lift relative overflow-hidden max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-5"></div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 text-[var(--color-text-light)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-fluid-lg font-semibold text-[var(--color-text)]">
                  Stay Updated
                </h3>
              </div>
              <p className="text-fluid-sm text-[var(--color-text-light)] mb-4 font-normal">
                Get notified when new articles are published. No spam, just
                quality content.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] text-fluid-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-300"
                  autoComplete="off"
                />
                <button className="px-6 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-medium rounded-xl transition-colors duration-300 text-fluid-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts - Vertical Layout */}
      {filteredPosts.length > 0 && (
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
      )}

      {/* Pagination */}
      {totalPages > 1 && filteredPosts.length > 0 && (
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
          {/* Floating elements */}
          <div className="absolute top-6 right-6 w-12 h-12 border border-[var(--color-accent)] rounded-full opacity-10 animate-pulse"></div>
          {/* <div
            className="absolute bottom-8 left-8 w-8 h-8 bg-[var(--color-accent)] rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div> */}

          <div className="relative z-10">
            <StatusBadge
              text="Stay Connected - Join the community"
              variant="info"
            />
            <h3 className="text-fluid-2xl lg:text-fluid-4xl font-light text-[var(--color-text)] mb-6 tracking-tight">
              Never Miss an <span className="font-medium">Update</span>
            </h3>
            <p className="text-fluid-base text-[var(--color-text-light)] mb-8 lg:mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
              Join a growing community of developers who rely on these insights
              to stay ahead. Get exclusive tips, early access to new articles,
              and behind-the-scenes content.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 lg:px-12 py-4 lg:py-5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-text)] font-semibold rounded-full transition-all duration-500 hover-lift text-fluid-base relative overflow-hidden min-w-[200px] justify-center"
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
              </Link>
              <Link
                to="/projects"
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

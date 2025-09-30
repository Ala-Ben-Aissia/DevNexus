import { motion } from "motion/react";
import { Link } from "react-router";
import type { PostMeta } from "~/types";

// Hero Featured Post - Takes up prominent space
function HeroFeaturedPost({ post }: { post: PostMeta }) {
  const postDate = new Date(post.date);
  const now = new Date();
  const daysDiff = Math.floor(
    (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isNew = daysDiff <= 7;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-secondary)] rounded-2xl lg:rounded-[2rem] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-700 overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-accent-hover)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Subtle glow effect */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-accent)] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 -z-10"></div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-14">
            {/* Header with badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              {isNew && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-full"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                      New Post
                    </span>
                  </div>
                </motion.div>
              )}

              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[var(--color-tertiary)]/50 backdrop-blur-sm text-[var(--color-text-light)] text-xs sm:text-sm font-medium rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/30 transition-all duration-500">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70"
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
                <span className="hidden sm:inline">
                  {postDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="sm:hidden">
                  {postDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[var(--color-tertiary)]/50 backdrop-blur-sm text-[var(--color-text-light)] text-xs sm:text-sm font-medium rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-accent)]/30 transition-all duration-500">
                <svg
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z"
                  />
                </svg>
                6 min read
              </div>
            </div>

            {/* Title - Extra large for hero */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[var(--color-text)] mb-4 sm:mb-6 leading-[1.15] tracking-tight group-hover:text-[var(--color-text)] transition-colors duration-500">
              {post.title}
            </h2>

            {/* Excerpt - Larger text for hero */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--color-text-light)] leading-relaxed mb-6 sm:mb-8 font-normal">
              {post.excerpt}
            </p>

            {/* Decorative divider */}
            <div className="relative h-px bg-gradient-to-r from-[var(--color-border)] via-[var(--color-accent)]/40 to-[var(--color-border)] mb-6 sm:mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-sm"></div>
            </div>

            {/* Read More CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <motion.div
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--color-accent)]/10 hover:bg-[var(--color-accent)]/20 rounded-full border border-[var(--color-accent)]/30 group-hover:border-[var(--color-accent)] transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm sm:text-base font-semibold transition-colors duration-300">
                  Read Full Article
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent)] group-hover:translate-x-1 transition-transform duration-300"
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
              </motion.div>

              {/* Floating badge */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="font-medium">Featured Article</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Secondary Featured Post Cards
function SecondaryPostCard({ post, index }: { post: PostMeta; index: number }) {
  const postDate = new Date(post.date);
  const now = new Date();
  const daysDiff = Math.floor(
    (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isNew = daysDiff <= 7;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group h-full"
    >
      <Link to={`/blog/${post.slug}`} className="block h-full">
        <div className="relative h-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] rounded-xl sm:rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 overflow-hidden hover:shadow-xl hover:shadow-[var(--color-accent)]/5 flex flex-col">
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 group-hover:from-[var(--color-accent)]/5 group-hover:to-transparent transition-all duration-500"></div>

          <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col flex-1">
            {/* Date and reading time */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <svg
                  className="w-3.5 h-3.5"
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
                {postDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <span className="text-[var(--color-border)]">•</span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                5 min
              </div>

              {isNew && (
                <div className="ml-auto px-2 sm:px-2.5 py-1 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-full">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    NEW
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-[var(--color-text)] mb-3 sm:mb-4 leading-tight tracking-tight group-hover:text-[var(--color-text)] transition-colors duration-300 flex-grow">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-[var(--color-text-light)] leading-relaxed mb-4 sm:mb-6 font-normal text-sm lg:text-base line-clamp-3">
              {post.excerpt}
            </p>

            {/* Divider */}
            <div className="w-12 h-px bg-gradient-to-r from-[var(--color-accent)] to-transparent mb-4 sm:mb-6 group-hover:w-20 transition-all duration-500"></div>

            {/* Read More Link */}
            <motion.div
              className="flex items-center gap-2 transition-colors duration-300"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm font-semibold tracking-wide">
                Continue Reading
              </span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function FeaturedPosts({ posts }: { posts: PostMeta[] }) {
  const latestPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  const [heroPost, ...secondaryPosts] = latestPosts;

  return (
    <div className="relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[var(--color-accent)] rounded-full opacity-[0.03] blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[var(--color-accent-hover)] rounded-full opacity-[0.02] blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Featured Post */}
        {heroPost && (
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <HeroFeaturedPost post={heroPost} />
          </div>
        )}

        {/* Secondary Posts Grid */}
        {secondaryPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {secondaryPosts.map((post, index) => (
              <SecondaryPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        {/* View All Button */}
        {posts.length > 3 && (
          <motion.div
            className="text-center mt-12 sm:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-10 lg:px-14 py-3.5 sm:py-4 lg:py-5 bg-gradient-to-r from-[var(--color-secondary)] via-[var(--color-tertiary)] to-[var(--color-secondary)] hover:from-[var(--color-tertiary)] hover:to-[var(--color-tertiary)] text-[var(--color-text)] rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-500 font-semibold text-sm sm:text-base relative overflow-hidden shadow-lg shadow-transparent hover:shadow-[var(--color-accent)]/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 via-[var(--color-accent-hover)]/10 to-[var(--color-accent)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Explore All Articles</span>
              <motion.svg
                className="relative z-10 w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

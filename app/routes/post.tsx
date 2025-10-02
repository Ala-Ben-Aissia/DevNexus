import type { Post } from "~/types";
import type { Route } from "./+types/post";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Copy from "~/components/Copy";

const markdownComponents: Partial<
  Record<keyof React.JSX.IntrinsicElements, React.ComponentType<any>>
> = {
  h1: ({ children, ...props }: any) => (
    <h1
      className="text-fluid-3xl font-bold mb-[var(--space-m)] mt-[var(--space-l)] first:mt-0 text-[var(--color-text)]"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2
      className="text-fluid-2xl font-semibold mb-[var(--space-s)] mt-[var(--space-l)] text-[var(--color-text)]"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3
      className="text-fluid-xl font-semibold mb-[var(--space-xs)] mt-[var(--space-m)] text-[var(--color-text)]"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4
      className="text-fluid-lg font-semibold mb-[var(--space-xs)] mt-[var(--space-m)] text-[var(--color-text)]"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: any) => (
    <h5
      className="text-fluid-base font-semibold mb-[var(--space-2xs)] mt-[var(--space-s)] text-[var(--color-text)]"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: any) => (
    <h6
      className="text-fluid-sm font-semibold mb-[var(--space-2xs)] mt-[var(--space-s)] text-[var(--color-text-light)] uppercase tracking-wider"
      {...props}
    >
      {children}
    </h6>
  ),

  p: ({ children, ...props }: any) => (
    <p
      className="mb-[var(--space-s)] text-fluid-base leading-relaxed text-[var(--color-text-light)]"
      {...props}
    >
      {children}
    </p>
  ),

  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-[var(--color-border)] pl-[var(--space-s)] my-[var(--space-m)] italic text-fluid-base text-[var(--color-text-muted)]"
      {...props}
    >
      {children}
    </blockquote>
  ),

  ul: ({ children, ...props }: any) => (
    <ul
      className="list-disc list-outside ml-[var(--space-m)] mb-[var(--space-s)] space-y-[var(--space-2xs)] text-fluid-base text-[var(--color-text-light)]"
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol
      className="list-none ml-0 mb-[var(--space-s)] space-y-[var(--space-2xs)] text-fluid-base text-[var(--color-text-light)] [counter-reset:item]"
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ordered, ...props }: any) => {
    const isOrdered = props.className?.includes("ordered") || ordered;

    if (isOrdered || props.parentName === "ol") {
      return (
        <li
          className="relative pl-[var(--space-l)] [counter-increment:item] before:content-[counter(item)'.'] before:absolute before:left-0 before:font-semibold before:text-[var(--color-text-light)]"
          {...props}
        >
          <span className="inline">{children}</span>
        </li>
      );
    }

    return (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    );
  },

  strong: ({ children, ...props }: any) => (
    <strong
      className="font-semibold text-[var(--color-text)] inline"
      {...props}
    >
      {children}
    </strong>
  ),

  em: ({ children, ...props }: any) => (
    <em className="italic inline" {...props}>
      {children}
    </em>
  ),

  code: ({ children, className, ...props }: any) => {
    // Inline code (no language specified)
    if (!className) {
      return (
        <code
          className="bg-[var(--color-tertiary)] text-[var(--color-text)] px-[var(--space-3xs)] py-[0.125rem] rounded text-lg font-mono inline break-words"
          {...props}
        >
          {children}
        </code>
      );
    }

    // Block code with syntax highlighting (handled by rehype-highlight)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },

  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-[var(--color-secondary)] text-[var(--color-text)] p-[var(--space-s)] rounded-lg mb-[var(--space-s)] overflow-x-auto text-xs md:text-sm font-mono"
      {...props}
    >
      {children}
    </pre>
  ),

  a: ({ children, href, ...props }: any) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline break-words inline transition-colors duration-200"
      {...props}
    >
      {children}
    </a>
  ),

  table: ({ children, ...props }: any) => (
    <div className="w-full overflow-x-auto mb-[var(--space-s)] rounded-lg border border-[var(--color-border)]">
      <table className="min-w-full border-collapse text-fluid-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: any) => (
    <thead className="bg-[var(--color-secondary)]" {...props}>
      {children}
    </thead>
  ),

  tbody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,

  tr: ({ children, ...props }: any) => (
    <tr
      className="border-b border-[var(--color-border)] last:border-b-0"
      {...props}
    >
      {children}
    </tr>
  ),

  th: ({ children, ...props }: any) => (
    <th
      className="px-[var(--space-s)] py-[var(--space-xs)] text-left font-semibold text-[var(--color-text)] border-r border-[var(--color-border)] last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: any) => (
    <td
      className="px-[var(--space-s)] py-[var(--space-xs)] text-[var(--color-text-light)] border-r border-[var(--color-border)] last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),

  hr: (props: any) => (
    <hr
      className="my-[var(--space-l)] border-[var(--color-border)]"
      {...props}
    />
  ),

  img: ({ src, alt, ...props }: any) => (
    <figure className="my-[var(--space-m)] -mx-[var(--space-s)] sm:mx-0">
      <img
        src={src}
        alt={alt}
        className="rounded-lg w-full h-auto shadow-lg"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="text-fluid-sm text-[var(--color-text-muted)] mt-[var(--space-xs)] text-center px-[var(--space-s)]">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

export async function loader({
  params,
}: Route.LoaderArgs): Promise<{ data: Post }> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/posts/${params.id}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const post = (await response.json()) as { data: Post };

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    console.error("Error loading post:", error);
    throw new Error("Failed to load post");
  }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { data: post } = loaderData;

  return (
    <div className="min-h-screen bg-[var(--color-primary)]">
      <div className="mx-auto max-w-4xl px-[var(--space-s)] py-[var(--space-m)] sm:px-[var(--space-m)] lg:px-[var(--space-l)]">
        {/* Back Navigation */}
        <div className="animate-fade-in-up bg-[var(--color-primary)] border-b border-[var(--color-border)] py-6">
          <div className="max-w-7xl mx-auto px-6">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-3 text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
              <span className="font-medium text-fluid-base">Back to Blog</span>
            </Link>
          </div>
        </div>

        {/* Main Content with proper markdown styles */}
        <article className="prose-container">
          <ReactMarkdown
            components={markdownComponents}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <footer className="mt-[var(--space-2xl)] border-t border-[var(--color-border)] pt-4 sm:pt-8]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-s)]">
            <div className="animate-fade-in-up bg-[var(--color-primary)] py-6">
              <div className="max-w-7xl mx-auto px-6">
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-3 text-[var(--color-text-light)] hover:text-[var(--color-text)] transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] rounded-2xl flex items-center justify-center transition-all duration-300 hover-lift">
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-fluid-base">
                    View All Posts
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-[var(--space-s)]">
              <Copy />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

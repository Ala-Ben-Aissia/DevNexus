import type { PostMeta } from "~/types";
import type { Route } from "./+types/post";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import remarkGfm from "remark-gfm";

// Clean, responsive markdown components with fixed list rendering
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
    // Check if this is part of an ordered list by looking at the parent
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

  // Fixed strong element to work properly in lists
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

  code: ({ children, ...props }: any) => {
    // Check if it's inline code (not wrapped in pre)
    const isInline = !props.className;

    if (isInline) {
      return (
        <code
          className="bg-[var(--color-tertiary)] text-[var(--color-text)] px-[var(--space-3xs)] py-[0.125rem] rounded text-fluid-sm font-mono inline break-words"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-fluid-sm block" {...props}>
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
  request,
}: Route.LoaderArgs): Promise<string> {
  const { slug } = params;
  try {
    const url = new URL("/posts_meta.json", request.url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    const postsMeta = (await response.json()) as PostMeta[];
    const postMeta = postsMeta.find((p) => p.slug === slug);

    if (!postMeta) {
      throw new Error("Post not found");
    }

    const postMdPreview = await import(`../posts/${postMeta.slug}.md?raw`);
    return postMdPreview.default;
  } catch (error) {
    console.error("Error loading post:", error);
    throw new Error("Failed to load post");
  }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const markdown = loaderData;

  return (
    <div className="min-h-screen bg-[var(--color-primary)]">
      <div className="mx-auto max-w-4xl px-[var(--space-s)] py-[var(--space-m)] sm:px-[var(--space-m)] lg:px-[var(--space-l)]">
        {/* Back Navigation */}
        <div className="pr-4 py-4 border-t dark:border-gray-700">
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-white transition-colors duration-300 group"
          >
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 group-hover:bg-gray-300 group-hover:dark:bg-gray-700 border border-gray-400 dark:border-gray-600 group-hover:border-gray-500 rounded-lg flex items-center justify-center transition-all duration-300">
              ←
            </div>
            <span className="font-medium">Back to Blog</span>
          </Link>
        </div>

        {/* Main Content with proper markdown styles */}
        <article className="prose-container">
          <ReactMarkdown
            components={markdownComponents}
            remarkPlugins={[remarkGfm]}
          >
            {markdown}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <footer className="mt-[var(--space-2xl)] border-t border-[var(--color-border)] pt-[var(--space-l)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-s)]">
            <Link
              to="/blog"
              className="inline-flex items-center gap-[var(--space-xs)] text-fluid-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:translate-x-[-2px]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>View all posts</span>
            </Link>

            {/* Optional: Add share buttons or other footer content */}
            <div className="flex items-center gap-[var(--space-s)]">
              <button
                className="text-fluid-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                🖹 Copy link
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

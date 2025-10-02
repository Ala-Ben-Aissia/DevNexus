import { useState } from "react";

export default function Copy({ link }: { link?: string }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link ?? window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <button
      onClick={handleCopyLink}
      className="group w-full px-6 py-4 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] hover:bg-[var(--color-tertiary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text)] font-medium rounded-2xl transition-all duration-300 hover-lift text-fluid-base relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        {copySuccess ? "Link Copied!" : "Copy Link"}
      </span>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
}

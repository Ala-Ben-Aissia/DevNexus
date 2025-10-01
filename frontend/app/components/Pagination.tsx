type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  goNext: () => void;
  goPrev: () => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  goNext,
  goPrev,
}: Props) {
  return totalPages <= 1 ? null : (
    <div className="flex items-center gap-4 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] px-8 py-6 rounded-3xl border border-[var(--color-border)] shadow-lg hover-lift gpu-accelerated">
      {/* Prev button */}
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className={`px-5 py-4 rounded-2xl text-fluid-base transition-all duration-500 hover-lift ${
          currentPage === 1
            ? "bg-[var(--color-tertiary)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50"
            : "bg-[var(--color-tertiary)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)] hover:shadow-md"
        }`}
        aria-label="Previous page"
      >
        <span className="transition-transform duration-300 hover:-translate-x-1">
          ‹
        </span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-6 py-4 rounded-2xl text-fluid-base transition-all duration-500 hover-lift relative overflow-hidden ${
              currentPage === index + 1
                ? "bg-[var(--color-accent)] text-[var(--color-text)] shadow-md"
                : "bg-[var(--color-tertiary)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)]"
            }`}
            aria-label={`Go to page ${index + 1}`}
          >
            <span className="relative z-10">{index + 1}</span>
            {currentPage === index + 1 && (
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-20"></div>
            )}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className={`px-5 py-4 rounded-2xl text-fluid-base transition-all duration-500 hover-lift ${
          currentPage === totalPages
            ? "bg-[var(--color-tertiary)] text-[var(--color-text-muted)] cursor-not-allowed opacity-50"
            : "bg-[var(--color-tertiary)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-[var(--color-text)] hover:shadow-md"
        }`}
        aria-label="Next page"
      >
        <span className="transition-transform duration-300 hover:translate-x-1">
          ›
        </span>
      </button>
    </div>
  );
}

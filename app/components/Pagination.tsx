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
    <div className="flex items-center gap-2 bg-gray-900 px-4 py-3 rounded-lg shadow-lg">
      {/* Prev button */}
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
          currentPage === 1
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        ‹
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-md text-sm transition-colors duration-200 ${
            currentPage === index + 1
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
          currentPage === totalPages
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        ›
      </button>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}


// Helper to generate page numbers with ellipsis for large page sets
function getPageNumbers(current: number, total: number): (number | string)[] {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}

// Pagination component with brand styling and page size selector
const Pagination: React.FC<PaginationProps> = ({ totalItems, pageSize, currentPage, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center justify-center mt-6 gap-2">
      {/* Pagination bar */}
      <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#02b2a4] shadow-lg">
        {/* Previous Button - always visible, faded if disabled */}
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full border-2 border-transparent text-white hover:bg-[#029e93] hover:text-white transition w-9 h-9 min-w-0 min-h-0 ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous"
        >
          <span className="text-lg">&lt;</span>
        </Button>
        {/* Page Numbers with ellipsis */}
        {pageNumbers.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={page}
              className={`w-9 h-9 flex items-center justify-center rounded-full relative font-semibold transition-all duration-200 text-sm
                ${page === currentPage
                  ? "bg-[#e0f7f5] text-[#02b2a4] border-2 border-white ring-2 ring-[#02b2a4] shadow"
                  : "bg-white text-[#02b2a4] border-2 border-transparent hover:bg-[#e0f7f5] hover:text-[#029e93]"}
              `}
              style={{ outline: page === currentPage ? 'none' : undefined }}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={"ellipsis-" + idx} className="w-9 h-9 flex items-center justify-center text-white text-lg select-none">...</span>
          )
        )}
        {/* Next Button - always visible, faded if disabled */}
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full border-2 border-transparent text-white hover:bg-[#029e93] hover:text-white transition w-9 h-9 min-w-0 min-h-0 ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next"
        >
          <span className="text-lg">&gt;</span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
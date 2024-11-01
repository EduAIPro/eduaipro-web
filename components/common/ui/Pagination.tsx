import { ArrowLeft2, ArrowRight2, More } from "iconsax-react";
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  isLoading?: boolean;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  className = "",
  isLoading = false,
}: PaginationProps) => {
  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Button styles
  const baseButtonStyles =
    "flex items-center border-[1.5px] border-brand-900 justify-center p-3 text-sm font-medium rounded-md transition-all duration-500";
  const activeStyles = "bg-blue-600 text-white hover:bg-blue-700 duration-500";
  const inactiveStyles = "text-gray-700 hover:bg-grey-7/30 duration-500";
  const disabledStyles = "opacity-50 cursor-not-allowed";
  const loadingStyles =
    "animate-pulse bg-gray-200 dark:bg-gray-700 cursor-not-allowed";

  // Loading button component
  const LoadingButton = () => (
    <div className={`${baseButtonStyles} ${loadingStyles} w-10 h-10`}>
      <div className="w-4 h-4" />
    </div>
  );

  // Loading navigation button
  const LoadingNavButton = () => (
    <div className={`${baseButtonStyles} ${loadingStyles} w-10 h-10`} />
  );

  if (isLoading) {
    return (
      <nav
        className={`flex items-center justify-center space-x-1 ${className}`}
        aria-label="Pagination"
      >
        {/* Loading Previous button */}
        <LoadingNavButton />

        {/* Loading page numbers */}
        <div className="hidden sm:flex sm:items-center sm:space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <LoadingButton key={i} />
          ))}
        </div>

        {/* Loading mobile view */}
        <div className="sm:hidden flex items-center space-x-1">
          <div className={`${baseButtonStyles} ${loadingStyles} w-32 h-10`} />
        </div>

        {/* Loading Next button */}
        <LoadingNavButton />
      </nav>
    );
  }

  return (
    <nav
      className={`flex items-center justify-center space-x-3 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseButtonStyles} ${
          currentPage === 1 ? disabledStyles : inactiveStyles
        } sm:block`}
        aria-label="Previous page"
      >
        <ArrowLeft2 className="h-4 w-4 text-brand-900" strokeWidth={1.5} />
      </button>

      {/* Page numbers */}
      <div className="hidden sm:flex sm:items-center sm:space-x-4">
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`dots-${index}`} className="">
              <More className="h-4 w-4" />
            </span>
          ) : (
            <button
              key={pageNumber}
              onClick={() =>
                typeof pageNumber === "number" && onPageChange(pageNumber)
              }
              className={`py-2 px-5 rounded-md font-medium ${
                pageNumber === currentPage ? activeStyles : inactiveStyles
              }`}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>

      {/* Mobile view - current page indicator */}
      <span className="sm:hidden text-sm text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`${baseButtonStyles} ${
          currentPage === totalPages ? disabledStyles : inactiveStyles
        } sm:block`}
        aria-label="Next page"
      >
        <ArrowRight2 className="h-4 w-4 text-brand-900" strokeWidth={1.5} />
      </button>
    </nav>
  );
};

export default Pagination;

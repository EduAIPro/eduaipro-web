"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex justify-start float-end">
      <Pagination>
        <PaginationContent className="flex items-center gap-2">
          
          <PaginationItem>
            <button
              className="px-2 py-1 border rounded-md"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
          </PaginationItem>

    
          <PaginationItem>
            <button
              className="px-2 py-1 border rounded-md"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
          </PaginationItem>

          <span className="px-3 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>


          <PaginationItem>
            <button
              className="px-2 py-1 border rounded-md"
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </PaginationItem>

       
          <PaginationItem>
            <button
              className="px-2 py-1 border rounded-md"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

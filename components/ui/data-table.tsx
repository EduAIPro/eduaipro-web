"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import EmptyIcon from "@/components/svgs/school/empty-table.svg";
import WarningIcon from "@/components/svgs/warning.svg";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { FilterIcon, X, XIcon } from "lucide-react";
import React, { type ReactNode, useEffect, useState } from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Skeleton } from "./skeleton";

// Define filter type with server-side filtering support
export type FilterOption = {
  id: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { value: string; label: string }[]; // For select filters
  value?: string; // For server-side filtering
  setFilter?: (val: string) => void; // For server-side filtering
};

// Define pagination metadata type
export type PaginationMeta = {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: PaginationMeta;
  isLoading?: boolean;
  canSearch?: boolean;
  searchInput?: {
    placeholder?: string;
    value: string;
    setValue: (text: string) => void;
  };
  isFetching?: boolean;
  isFiltering?: boolean; // New prop to distinguish filter fetching from search fetching
  onRowClick?: (value: TData) => void;
  onRefresh?: () => void;
  onAddNew?: () => void;
  onPageChange?: (page: number) => void;
  emptyComponent?: ReactNode;
  errorComponent?: ReactNode;
  hasError?: boolean;
  // New props for filtering
  otherFilters?: ReactNode;
  filterOptions?: FilterOption[];
}

export function DataTable<TData, TValue>({
  columns,
  onAddNew,
  onRefresh,
  data,
  meta,
  emptyComponent,
  isLoading,
  isFetching,
  isFiltering = false,
  canSearch = true,
  otherFilters,
  searchInput,
  errorComponent,
  hasError,
  onRowClick,
  onPageChange,
  filterOptions = [],
  ...restProps
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeFilters, setActiveFilters] = useState<
    { id: string; value: string }[]
  >([]);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(meta?.page || 1);

  // Update current page when meta changes
  useEffect(() => {
    if (meta?.page) {
      setCurrentPage(meta.page);
    }
  }, [meta?.page]);

  // Use actual data or create skeleton entries when initially loading
  const tableData = React.useMemo(() => {
    if (isLoading && (!data || data.length === 0)) {
      // Create skeleton data that matches the TData type structure
      return Array(10)
        .fill(null)
        .map((_, index) => ({
          // Create a minimal object that will work with skeleton rendering
          ...({} as TData),
          id: `skeleton-${index}`,
        }));
    }
    return data || [];
  }, [isLoading, data]);

  // Create skeleton columns for loading state
  const tableColumns = React.useMemo(() => {
    if (isLoading && (!data || data.length === 0)) {
      return columns.map((column) => ({
        ...column,
        cell: () => <Skeleton className="my-1 h-4 w-full rounded-md" />,
      }));
    }
    return columns;
  }, [isLoading, data, columns]);

  const table = useReactTable({
    data: tableData as TData[],
    columns: tableColumns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // Tell the table we're doing manual pagination
    pageCount: meta?.totalPages || 1,
    ...restProps,
  });

  // Add a filter - handles both client-side and server-side filtering
  const addFilter = (filterId: string, value: string) => {
    if (value === undefined || value === null || value === "") return;

    // Find the filter option
    const filterOption = filterOptions.find((opt) => opt.id === filterId);

    // If this is a server-side filter with a setFilter function, use that
    if (filterOption?.setFilter) {
      filterOption.setFilter(value);
    }

    // Check if filter already exists in active filters display
    const existingFilter = activeFilters.find((f) => f.id === filterId);
    if (existingFilter) {
      // Update existing filter
      setActiveFilters(
        activeFilters.map((f) => (f.id === filterId ? { ...f, value } : f))
      );
    } else {
      // Add new filter
      setActiveFilters([...activeFilters, { id: filterId, value }]);
    }

    // Update tanstack filter state for client-side filtering
    setColumnFilters((old) =>
      old
        .filter((f) => f.id !== filterId)
        .concat({
          id: filterId,
          value,
        })
    );
  };

  // Remove a filter - handles both client-side and server-side filtering
  const removeFilter = (filterId: string) => {
    // Find the filter option
    const filterOption = filterOptions.find((opt) => opt.id === filterId);

    // If this is a server-side filter with a setFilter function, clear it
    if (filterOption?.setFilter) {
      filterOption.setFilter("");
    }

    // Update active filters display
    setActiveFilters(activeFilters.filter((f) => f.id !== filterId));

    // Update tanstack filter state for client-side filtering
    setColumnFilters((old) => old.filter((f) => f.id !== filterId));
  };

  // Clear all filters - handles both client-side and server-side filtering
  const clearAllFilters = () => {
    // Clear all server-side filters
    filterOptions.forEach((option) => {
      if (option.setFilter) {
        option.setFilter("");
      }
    });

    // Clear active filters display
    setActiveFilters([]);

    // Clear tanstack filter state for client-side filtering
    setColumnFilters([]);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;

    setCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="">
      <div className="flex md:items-center justify-between max-md:flex-col">
        <div className="flex items-center gap-4 max-md:pb-2">
          {canSearch && searchInput ? (
            <Input
              placeholder={searchInput?.placeholder ?? "Search"}
              value={searchInput?.value || ""}
              onChange={(e) => searchInput?.setValue?.(e.target.value)}
              className="rounded-md !border px-3 bg-white md:w-64"
              disabled={isFiltering} // Only disable during filtering, not all fetching
            />
          ) : null}
        </div>

        <div className="flex sm:items-center gap-3 max-sm:flex-wrap max-sm:flex-col">
          {activeFilters?.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8 px-2 text-xs"
              disabled={isFiltering} // Only disable during filtering
            >
              Clear filters <X />
            </Button>
          )}
          <Popover open={isFilterOpen} onOpenChange={(v) => setIsFilterOpen(v)}>
            <PopoverTrigger asChild>
              <Button className="bg-white text-grey-500 border-grey-400 hover:bg-grey-3/50">
                <FilterIcon />
                <p>Filter</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-3 py-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm">Filter</h3>
                <button className="p-2 hover:bg-grey-3 duration-300 rounded-md">
                  <XIcon className="size-4" />
                </button>
              </div>
              <div className="py-4"></div>
              <div className="flex items-center justify-end">
                <Button size="sm">Filter</Button>
              </div>
            </PopoverContent>
          </Popover>

          {otherFilters ? (
            <div className="flex items-center gap-3">{otherFilters}</div>
          ) : null}
          {filterOptions.length > 0 ? (
            <>
              {/* Display active filters */}
              {activeFilters?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeFilters.map((filter) => {
                    const filterOption = filterOptions.find(
                      (opt) => opt.id === filter.id
                    );
                    let displayValue = filter.value;

                    // For select filters, display the label instead of the value
                    if (
                      filterOption?.type === "select" &&
                      filterOption.options
                    ) {
                      const option = filterOption.options.find(
                        (opt) => opt.value === filter.value
                      );
                      if (option) displayValue = option.label;
                    }

                    return (
                      <Badge
                        key={filter.id}
                        variant="secondary"
                        className="flex items-center gap-2 py-1"
                      >
                        <span>
                          {filterOption?.label}:{" "}
                          {displayValue === "all" ? "All" : displayValue}
                        </span>
                        <div
                          role="button"
                          className="w-fit cursor-pointer"
                          onClick={() =>
                            !isFiltering && removeFilter(filter.id)
                          } // Only disable during filtering
                        >
                          <X className="h-4 w-4 cursor-pointer" />
                        </div>
                      </Badge>
                    );
                  })}
                </div>
              )}

              {/* Loading indicator for filters - only show during filtering, not search */}
              {/* {isFiltering && !isLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                  Applying filters...
                </div>
              )} */}
            </>
          ) : null}
        </div>
      </div>
      <div className="flex">
        <ScrollArea type="auto" className="w-1 flex-1">
          <div className="my-4 bg-white border rounded-xl">
            <Table>
              <TableHeader className="pb-4 pt-2 bg-[#F4F4F4]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="text-grey-500 text-sm font-semibold first:rounded-tl-xl last:rounded-tr-xl"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {hasError ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns?.length}
                      className="text-center"
                    >
                      {errorComponent || (
                        <ErrorComponent
                          onRefresh={onRefresh}
                          loading={Boolean(isFetching || isLoading)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          className={cn(
                            "h-12",
                            onRowClick && !isLoading && !isFiltering
                              ? "cursor-pointer"
                              : "", // Only disable clicks during loading or filtering
                            isFiltering && !isLoading ? "opacity-60" : "" // Only grey out during filtering, not search
                          )}
                          onClick={() =>
                            !isLoading &&
                            !isFiltering &&
                            onRowClick?.(row.original as TData)
                          } // Only disable during loading or filtering
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : !isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns?.length}
                          className="text-center"
                        >
                          {emptyComponent || (
                            <EmptyComponent
                              onRefresh={onRefresh}
                              loading={Boolean(isFetching || isLoading)}
                              onAddNew={onAddNew}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading || isFiltering} // Only disable during loading or filtering
                variant={currentPage > 1 ? "default" : "ghost"}
              >
                Previous
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage >= (meta?.totalPages || 1) ||
                  isLoading ||
                  isFiltering
                } // Only disable during loading or filtering
                data-testid="TC09"
                variant={
                  currentPage < (meta?.totalPages || 1) ? "default" : "ghost"
                }
              >
                Next
              </Button>
            </div>
            <div>
              <span className="text-sm font-medium">
                Page {currentPage} of {meta?.totalPages || 1}
                {meta?.total ? ` (${meta.total} total items)` : ""}
              </span>
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

type BaseProps = { onRefresh?: () => void; loading: boolean };

const ErrorComponent = ({ onRefresh, loading }: BaseProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <WarningIcon />
      <div className="mt-6">
        <p className="text-error-1 mx-auto max-w-sm font-medium">
          There was an error while loading data. Please try again.
        </p>
      </div>
      <div className="flex gap-2 py-2">
        {onRefresh && (
          <Button onClick={onRefresh} loading={loading}>
            Refresh
          </Button>
        )}
      </div>
    </div>
  );
};

const EmptyComponent = ({
  onRefresh,
  loading,
  onAddNew,
}: BaseProps & { onAddNew?: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <EmptyIcon />
      <div className="mt-6">
        <p className="mx-auto max-w-sm font-medium">
          There are currently no records to display
        </p>
      </div>
      <div className="flex gap-2 py-2">
        {onRefresh && (
          <Button loading={loading} onClick={onRefresh}>
            Refresh
          </Button>
        )}
        {onAddNew && <Button onClick={onAddNew}>Add New</Button>}
      </div>
    </div>
  );
};

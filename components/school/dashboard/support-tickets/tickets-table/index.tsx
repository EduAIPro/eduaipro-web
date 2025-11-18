"use client";
import { TicketsListColumnsDef } from "./columns";

import { getCoursesKey, getTicketsKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import useDebounce from "@/hooks/use-debounce";
import { GetSupportTicketList, TableTicket } from "@/types/admin/support";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

export const TicketsTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { value } = useDebounce(searchValue, 500);

  const { data, isLoading, error } = useSWR<GetSupportTicketList>(
    [getTicketsKey, currentPage, value],
    fetchPaginatedSearchQuery
  );

  const filterOptions = useMemo(
    () => [
      {
        id: "search",
        label: "Search",
        type: "text" as const,
        searchValue: searchValue,
        setSearchValue: (val: string) => setSearchValue(val),
      },
    ],
    [searchValue]
  );

  return (
    <Fragment>
      <DataTable<TableTicket, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={TicketsListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(getCoursesKey)}
        searchInput={{
          placeholder: "Search tickets",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.totalPages || 10,
          limit: 10,
        }}
      />
    </Fragment>
  );
};

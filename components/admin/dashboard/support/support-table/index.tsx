"use client";
import { TicketsListColumnsDef } from "./columns";

import { getCoursesKey, ticketsKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import useDebounce from "@/hooks/use-debounce";
import {
  GetSupportTicketList,
  TableTicket,
} from "@/utils/validation/admin/support";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { TicketInfoSheet } from "../ticket-info-sheet";

export const SupportTicketsTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketId, setTicketId] = useState<null | string>(null);
  const { value } = useDebounce(searchValue, 500);

  const { data, isLoading, error } = useSWR<GetSupportTicketList>(
    [ticketsKey, currentPage, value],
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
        onRowClick={(row) => {
          setTicketId(row.id);
        }}
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.totalPages || 10,
          limit: 10,
        }}
      />

      <TicketInfoSheet
        open={!!ticketId}
        toggleOpen={(v) => (!v ? setTicketId(null) : null)}
        id={ticketId}
      />
    </Fragment>
  );
};

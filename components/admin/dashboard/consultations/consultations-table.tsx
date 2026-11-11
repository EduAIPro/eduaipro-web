"use client";

import { adminConsultationsKey } from "@/api/keys";
import api from "@/api/base";
import { DataTable } from "@/components/ui/data-table";
import {
  ConsultationListResponse,
  ConsultationRequestRow,
} from "@/types/consultation";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

const PAGE_SIZE = 10;

const fetchConsultations = ([url, page, limit, search]: [
  string,
  number,
  number,
  string,
]) =>
  api
    .get(url, { params: { page, limit, ...(search ? { search } : {}) } })
    .then((res) => res.data.data);

// the date is a UTC calendar day, so format it in UTC to avoid a day shift
const utcDay = (iso: string) =>
  format(new Date(iso.slice(0, 10) + "T12:00:00"), "do MMM, yyyy");

const columns: ColumnDef<ConsultationRequestRow>[] = [
  {
    accessorKey: "schoolName",
    header: "School name",
    cell: ({ row }) => (
      <p className="text-grey-800 truncate text-sm font-semibold">
        {row.original.schoolName}
      </p>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) =>
      row.original.email ? (
        <a
          href={`mailto:${row.original.email}`}
          className="text-primary truncate text-sm font-medium hover:underline"
        >
          {row.original.email}
        </a>
      ) : (
        <span className="text-grey-500">—</span>
      ),
  },
  {
    accessorKey: "consultationDate",
    header: "Requested date",
    cell: ({ row }) => (
      <p className="text-grey-500 whitespace-nowrap text-sm font-medium">
        {utcDay(row.original.consultationDate)}
      </p>
    ),
  },
  {
    accessorKey: "schoolSize",
    header: "School size",
    cell: ({ row }) => (
      <p className="text-grey-500 text-sm font-medium">
        {row.original.schoolSize.toLocaleString("en-NG")}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => (
      <p className="text-grey-500 whitespace-nowrap text-sm font-medium">
        {format(new Date(row.original.createdAt), "do MMM, yyyy, HH:mm")}
      </p>
    ),
  },
];

export const ConsultationsTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // debounce so each keystroke isn't a request
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchValue.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchValue]);

  const { data, isLoading, error, mutate } = useSWR<ConsultationListResponse>(
    [adminConsultationsKey, page, PAGE_SIZE, search],
    fetchConsultations,
    { keepPreviousData: true },
  );

  const filterOptions = useMemo(
    () => [
      {
        id: "search",
        label: "Search",
        type: "text" as const,
        searchValue,
        setSearchValue,
      },
    ],
    [searchValue],
  );

  return (
    <DataTable<ConsultationRequestRow, unknown>
      canSearch
      hasError={!!error}
      isLoading={isLoading}
      data={data?.data ?? []}
      columns={columns}
      filterOptions={filterOptions}
      onPageChange={setPage}
      onRefresh={() => mutate()}
      searchInput={{
        placeholder: "Search school",
        value: searchValue,
        setValue: setSearchValue,
      }}
      meta={{
        total: data?.pagination.total ?? 0,
        page: data?.pagination.current ?? 1,
        totalPages: data?.pagination.totalPages ?? 1,
        limit: PAGE_SIZE,
      }}
    />
  );
};

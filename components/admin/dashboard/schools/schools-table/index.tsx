"use client";
import { TeachersListColumnsDef } from "./columns";

import { getSchoolsKey, getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import { SchoolStaff, SchoolStaffsData } from "@/types/school/teachers";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { InviteSchoolModal } from "../modals";
import { Empty } from "./empty";

export const SchoolsTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const { data, isLoading, error } = useSWR<SchoolStaffsData>(
    [getSchoolsKey, currentPage],
    fetchPaginatedData
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
      <DataTable<Omit<SchoolStaff, "school">, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={TeachersListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(getSchoolStaffsKey)}
        emptyComponent={<Empty />}
        searchInput={{
          placeholder: "Search school",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          router.push(`/admin/schools/${row.id}`);
        }}
        otherFilters={
          <>
            <InviteSchoolModal />
          </>
        }
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.total || 10,
          limit: 10,
        }}
      />
    </Fragment>
  );
};

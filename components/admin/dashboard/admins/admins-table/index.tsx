"use client";
import { AdminsListColumnsDef } from "./columns";

import { getAllSystemAdmins } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import { GetSystemStaffs } from "@/types/admin/teachers";
import { Staff } from "@/types/user";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { AdminProfile } from "../admin-profile";

export const AdminsTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [adminId, setAdminId] = useState<null | string>(null);

  const { data, isLoading, error } = useSWR<GetSystemStaffs>(
    [getAllSystemAdmins, currentPage, searchValue],
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
      <DataTable<Staff, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={AdminsListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(getAllSystemAdmins)}
        searchInput={{
          placeholder: "Search admins",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setAdminId(row.id);
          setOpen(true);
        }}
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.totalPages || 10,
          limit: 10,
        }}
      />

      {adminId ? (
        <AdminProfile
          open={isOpen}
          toggleOpen={(v) => setOpen(v)}
          adminId={adminId}
        />
      ) : null}
    </Fragment>
  );
};

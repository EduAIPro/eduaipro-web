"use client";
import { TeachersListColumnsDef } from "./columns";

import { getAllSystemStaffsKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { InviteTeacherModal } from "@/components/school/dashboard/teachers/modals";
import { TeacherProfile } from "@/components/school/dashboard/teachers/profile";
import { DataTable } from "@/components/ui/data-table";
import { GetSystemStaffs, SystemStaff } from "@/types/admin/teachers";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

export const SystemTeachersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<null | string>(null);

  const { data, isLoading, error } = useSWR<GetSystemStaffs>(
    [getAllSystemStaffsKey, currentPage, searchValue],
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
      <DataTable<SystemStaff, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={TeachersListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(getAllSystemStaffsKey)}
        searchInput={{
          placeholder: "Search teacher",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setTeacherId(row.id);
          setOpen(true);
        }}
        otherFilters={
          <>
            <InviteTeacherModal />
          </>
        }
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.total || 10,
          limit: 10,
        }}
      />

      {teacherId ? (
        <TeacherProfile
          open={isOpen}
          toggleOpen={(v) => setOpen(v)}
          teacherId={teacherId}
          isAdmin
        />
      ) : null}
    </Fragment>
  );
};

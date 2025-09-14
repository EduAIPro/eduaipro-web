"use client";
import { SchoolTeachersListColumnsDef } from "./columns";

import { adminGetSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { TeacherProfile } from "@/components/school/dashboard/teachers/profile";
import { DataTable } from "@/components/ui/data-table";
import { SchoolStaff, SchoolStaffsData } from "@/types/school/teachers";
import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

type SchoolTeachersTableProps = {
  schoolId: string | undefined;
};

export const SchoolTeachersTable = ({ schoolId }: SchoolTeachersTableProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const { data, isLoading, error } = useSWR<SchoolStaffsData>(
    schoolId
      ? [adminGetSchoolStaffsKey(schoolId), currentPage, schoolId]
      : null,
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
        columns={SchoolTeachersListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(adminGetSchoolStaffsKey(schoolId ?? ""))}
        searchInput={{
          placeholder: "Search teachers",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setTeacherId(row.id);
        }}
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.totalPages || 10,
          limit: 10,
        }}
      />

      <TeacherProfile
        isAdmin
        open={!!teacherId}
        teacherId={teacherId ?? ""}
        toggleOpen={(v) => {
          if (!v) setTeacherId(null);
        }}
      />
    </Fragment>
  );
};

"use client";
import { SchoolCertificatesListColumnsDef } from "./columns";

import { adminGetSchoolCertificationsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { EmptyState } from "@/components/empty";
import { DataTable } from "@/components/ui/data-table";
import {
  ListSchoolCertificates,
  SchoolCertificate,
} from "@/types/admin/schools";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

type SchoolTeachersTableProps = {
  schoolId: string | undefined;
};

export const CertificatesTable = ({ schoolId }: SchoolTeachersTableProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useSWR<ListSchoolCertificates>(
    schoolId
      ? [adminGetSchoolCertificationsKey(schoolId), currentPage, schoolId]
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
      <DataTable<SchoolCertificate, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={SchoolCertificatesListColumnsDef}
        filterOptions={filterOptions}
        emptyComponent={<EmptyState />}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() =>
          mutate(adminGetSchoolCertificationsKey(schoolId ?? ""))
        }
        searchInput={{
          placeholder: "Search certificates",
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

"use client";
import { TeachersListColumnsDef } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Teacher } from "@/types/school/teachers";
import { useMemo, useState } from "react";
import teachers from "../../../data/teachers.json";
import { InviteTeacherModal } from "../modals/invite-teacher.modal";
import { SendMessageModal } from "../modals/send-message.modal";
import { Empty } from "./empty";

export const TeachersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
    <DataTable<Teacher, unknown>
      hasError={false}
      isLoading={false}
      data={teachers}
      columns={TeachersListColumnsDef}
      filterOptions={filterOptions}
      onPageChange={(page) => setCurrentPage(page)}
      canSearch
      emptyComponent={<Empty />}
      searchInput={{
        placeholder: "Search teacher",
        value: searchValue,
        setValue: (val: string) => setSearchValue(val),
      }}
      otherFilters={
        <>
          <SendMessageModal />
          <InviteTeacherModal />
        </>
      }
      // onRefresh={() => treatmentQuery.refetch()}
      // meta={{
      // 	total: treatmentQuery?.data?.totalItems || 0,
      // 	page: treatmentQuery?.data?.currentPage || 1,
      // 	totalPages: treatmentQuery?.data?.totalPages || 1,
      // 	limit: treatmentQuery?.data?.limit || 10,
      // }}
    />
  );
};

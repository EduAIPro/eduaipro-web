"use client";
import { TeachersListColumnsDef } from "./columns";

import { useQueryApi } from "@/api/hooks/useQueryApi";
import { GET_ALL_SCHOOL_TEACHERS_QUERY_KEY } from "@/api/keys";
import { getAllTeachersBySchool } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import useSchoolStore from "@/store/school";
import { Pagination } from "@/types/api";
import { Teacher } from "@/types/school";
import { Fragment, useMemo, useState } from "react";
import { UseQueryResult } from "react-query";
import { InviteTeacherModal } from "../modals/invite-teacher.modal";
import { SendMessageModal } from "../modals/send-message.modal";
import { TeacherProfile } from "../profile";
import { Empty } from "./empty";

export const TeachersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [teacher, setTeacher] = useState<null | Teacher>(null);
  const { school } = useSchoolStore();
  console.log({ school });
  const getSchoolTeachersQuery: UseQueryResult<
    Pagination & { data: Teacher[] }
  > = useQueryApi([GET_ALL_SCHOOL_TEACHERS_QUERY_KEY], getAllTeachersBySchool);

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
      <DataTable<Teacher, unknown>
        canSearch
        hasError={getSchoolTeachersQuery.isError}
        isLoading={getSchoolTeachersQuery.isLoading}
        data={getSchoolTeachersQuery.data?.data ?? []}
        columns={TeachersListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => getSchoolTeachersQuery.refetch()}
        emptyComponent={<Empty />}
        searchInput={{
          placeholder: "Search teacher",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setTeacher(row);
          setOpen(true);
        }}
        otherFilters={
          <>
            <SendMessageModal />
            <InviteTeacherModal />
          </>
        }
        meta={{
          total: getSchoolTeachersQuery?.data?.total || 0,
          page: getSchoolTeachersQuery?.data?.page || 1,
          totalPages:
            getSchoolTeachersQuery?.data?.total! /
              getSchoolTeachersQuery?.data?.limit! || 1,
          limit: getSchoolTeachersQuery?.data?.limit || 10,
        }}
      />

      {teacher ? (
        <TeacherProfile
          open={isOpen && !!teacher}
          toggleOpen={(v) => setOpen(v)}
          teacherId={teacher?._id}
        />
      ) : null}
    </Fragment>
  );
};

"use client";
import { TeachersListColumnsDef } from "./columns";

import { getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedData } from "@/api/queries";
import { SendMessageModal } from "@/components/admin/modals";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { SchoolStaff, SchoolStaffsData } from "@/types/school/teachers";
import { MegaphoneIcon } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { InviteTeacherModal } from "../modals";
import { TeacherProfile } from "../profile";
import { Empty } from "./empty";

export const TeachersTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [teacherId, setTeacherId] = useState<null | string>(null);

  const { data, isLoading, error } = useSWR<SchoolStaffsData>(
    [getSchoolStaffsKey, currentPage],
    fetchPaginatedData,
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
    [searchValue],
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
          placeholder: "Search teacher",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setTeacherId(row.id);
          setOpen(true);
        }}
        otherFilters={
          <div className="flex-1 flex sm:items-center gap-1.5 sm:gap-3 max-sm:flex-col">
            <SendMessageModal
              type="school"
              modalTrigger={
                <Button className="flex-1">
                  <MegaphoneIcon /> <p>Send message</p>
                </Button>
              }
            />
            <InviteTeacherModal key={getSchoolStaffsKey} />
          </div>
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
        />
      ) : null}
    </Fragment>
  );
};

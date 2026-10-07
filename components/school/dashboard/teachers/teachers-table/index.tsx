"use client";
import { TeachersListColumnsDef } from "./columns";

import { getSchoolStaffsKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { SendMessageModal } from "@/components/admin/modals";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import useDebounce from "@/hooks/use-debounce";
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
  const { value } = useDebounce(searchValue, 500);
  const searchTerm = value.trim();

  const { data, isLoading, error } = useSWR<SchoolStaffsData>(
    [getSchoolStaffsKey, currentPage, encodeURIComponent(searchTerm)],
    fetchPaginatedSearchQuery,
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
        emptyComponent={
          searchTerm ? (
            <p className="py-10 font-medium">
              {`No teachers match "${searchTerm}".`}
            </p>
          ) : (
            <Empty />
          )
        }
        searchInput={{
          placeholder: "Search teacher",
          value: searchValue,
          setValue: (val: string) => {
            setSearchValue(val);
            setCurrentPage(1);
          },
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
          totalPages: data?.pagination.totalPages || 1,
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

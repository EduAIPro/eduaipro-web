"use client";
import { CoursesListColumnsDef } from "./columns";

import { getCoursesKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import useDebounce from "@/hooks/use-debounce";
import { GetCoursesList, TableCourse } from "@/types/admin/courses";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { ViewCourse } from "../view-course";

export const CoursesTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [courseId, setCourseId] = useState<null | string>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { value } = useDebounce(searchValue, 500);

  const { data, isLoading, error } = useSWR<GetCoursesList>(
    [getCoursesKey, currentPage, value],
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
      <DataTable<TableCourse, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={CoursesListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(getCoursesKey)}
        searchInput={{
          placeholder: "Search course",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setIsOpen(true);
          setCourseId(row.id);
        }}
        otherFilters={
          <>
            <Link href="/admin/courses/create">
              <Button>
                <PlusIcon />
                <p>Create new course</p>
              </Button>
            </Link>
          </>
        }
        meta={{
          total: data?.pagination.total || 0,
          page: data?.pagination.current || 1,
          totalPages: data?.pagination.totalPages || 10,
          limit: 10,
        }}
      />

      {courseId ? (
        <ViewCourse
          isOpen={isOpen}
          courseId={courseId}
          toggleOpen={(v) => setIsOpen(v)}
        />
      ) : null}
    </Fragment>
  );
};

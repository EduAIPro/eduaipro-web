"use client";
import { SurveysListColumnsDef } from "./columns";

import { getCoursesKey, getSurveysKey } from "@/api/keys";
import { fetchPaginatedSearchQuery } from "@/api/queries";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import useDebounce from "@/hooks/use-debounce";
import { GetSurveysList, TableSurvey } from "@/types/admin/surveys";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { SurveyDetailsSheet } from "./survey-details-sheet";

export const SurveysTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { value } = useDebounce(searchValue, 500);
  const [selectedSurvey, setSelectedSurvey] = useState<TableSurvey | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data, isLoading, error } = useSWR<GetSurveysList>(
    [getSurveysKey, currentPage, value],
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
      <DataTable<TableSurvey, unknown>
        canSearch
        hasError={!!error}
        isLoading={isLoading}
        data={data?.data ?? []}
        columns={SurveysListColumnsDef}
        filterOptions={filterOptions}
        onPageChange={(page) => setCurrentPage(page)}
        onRefresh={() => mutate(getCoursesKey)}
        searchInput={{
          placeholder: "Search surveys",
          value: searchValue,
          setValue: (val: string) => setSearchValue(val),
        }}
        onRowClick={(row) => {
          setSelectedSurvey(row);
          setIsSheetOpen(true);
        }}
        otherFilters={
          <>
            <Link href="/admin/survey/create">
              <Button>
                <PlusIcon />
                <p>Create new survey</p>
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
      <SurveyDetailsSheet
        open={isSheetOpen}
        toggleOpen={setIsSheetOpen}
        survey={selectedSurvey}
      />
    </Fragment>
  );
};

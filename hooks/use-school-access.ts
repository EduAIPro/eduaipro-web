import { schoolAccessKey } from "@/api/keys";
import api from "@/api/base";
import { SchoolAccess } from "@/types/school/billing";
import { AxiosError } from "axios";
import useSWR from "swr";

type AccessError = { status: number | undefined; message: string };

// x-raw-error keeps the HTTP status so a 403 (personal workspace) is detectable.
const accessFetcher = (url: string) =>
  api
    .get(url, { headers: { "x-raw-error": "1" } })
    .then((res) => res.data.data)
    .catch((e: AxiosError<{ message?: string }>) => {
      throw {
        status: e.response?.status,
        message: e.response?.data?.message ?? e.message,
      } satisfies AccessError;
    });

export default function useSchoolAccess(shouldFetch = true) {
  const { data, error, isLoading, mutate } = useSWR<SchoolAccess, AccessError>(
    shouldFetch ? schoolAccessKey : null,
    accessFetcher,
    { shouldRetryOnError: false },
  );

  return {
    access: data ?? null,
    state: data?.state ?? null,
    isLoading,
    isError: !!error,
    forbidden: error?.status === 403,
    refetch: () => mutate(),
    mutate,
  };
}

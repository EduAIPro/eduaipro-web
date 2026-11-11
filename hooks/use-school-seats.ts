import { schoolSeatsKey } from "@/api/keys";
import api from "@/api/base";
import { SchoolSeatsData } from "@/types/school/billing";
import { AxiosError } from "axios";
import useSWR from "swr";

type SeatsError = { status: number | undefined; message: string };

// x-raw-error keeps the HTTP status so a 403 (personal workspace) is detectable.
const seatsFetcher = (url: string) =>
  api
    .get(url, { headers: { "x-raw-error": "1" } })
    .then((res) => res.data.data)
    .catch((e: AxiosError<{ message?: string }>) => {
      throw {
        status: e.response?.status,
        message: e.response?.data?.message ?? e.message,
      } satisfies SeatsError;
    });

export default function useSchoolSeats(
  options: { shouldFetch?: boolean; refreshInterval?: number } = {},
) {
  const { shouldFetch = true, refreshInterval = 0 } = options;
  const { data, error, isLoading, mutate } = useSWR<
    SchoolSeatsData,
    SeatsError
  >(shouldFetch ? schoolSeatsKey : null, seatsFetcher, {
    refreshInterval,
    shouldRetryOnError: false,
  });

  return {
    seats: data ?? null,
    isLoading,
    isError: !!error,
    forbidden: error?.status === 403,
    refetch: () => mutate(),
    mutate,
    error,
  };
}

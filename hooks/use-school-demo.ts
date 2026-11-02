import { schoolDemoKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { DemoStatus } from "@/types/school/billing";
import useSWR from "swr";

/** `demo` is null when the school never started one. */
export default function useSchoolDemo(shouldFetch = true) {
  const { data, error, isLoading, mutate } = useSWR<DemoStatus | null>(
    shouldFetch ? schoolDemoKey : null,
    generalFetcher,
    { shouldRetryOnError: false },
  );

  return {
    demo: data ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
  };
}

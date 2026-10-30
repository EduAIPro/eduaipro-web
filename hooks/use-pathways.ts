import { getPathwaysKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { GetPathwaysResponse } from "@/types/enrollment";
import useSWR from "swr";

export default function usePathways(shouldFetch = true) {
  const { data, error, isLoading, mutate } = useSWR<GetPathwaysResponse>(
    shouldFetch ? getPathwaysKey : null,
    generalFetcher,
  );

  return {
    pathways: data?.pathways ?? [],
    entitlement: data?.entitlement ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}
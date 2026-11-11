import { adminSchoolDemosKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { AdminDemo } from "@/types/admin/billing";
import useSWR from "swr";

export default function useAdminDemos(status: string) {
  const url = status ? `${adminSchoolDemosKey}?status=${status}` : adminSchoolDemosKey;
  const { data, error, isLoading, mutate } = useSWR<AdminDemo[]>(
    url,
    generalFetcher,
  );

  return {
    demos: data ?? [],
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
  };
}

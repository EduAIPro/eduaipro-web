import { schoolPendingInvitesKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { PendingInvite } from "@/types/school/invites";
import useSWR from "swr";

export default function useSchoolPendingInvites() {
  const { data, error, isLoading, mutate } = useSWR<PendingInvite[]>(
    schoolPendingInvitesKey,
    generalFetcher,
    { shouldRetryOnError: false },
  );

  return {
    invites: data ?? [],
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
  };
}

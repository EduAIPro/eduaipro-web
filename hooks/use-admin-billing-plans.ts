import { adminBillingPlansKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { AdminBillingPlan } from "@/types/admin/billing";
import useSWR from "swr";

export default function useAdminBillingPlans() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    AdminBillingPlan[]
  >(adminBillingPlansKey, generalFetcher);

  return {
    plans: data ?? [],
    isLoading,
    isFetching: isValidating,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}

import { getAllPlans, getPathwaysKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { BillingPlan } from "@/types/billing";
import { GetPathwaysResponse } from "@/types/enrollment";
import useSWR from "swr";

export default function useSubscriptionPlans() {
  const { data, error, isLoading, mutate } = useSWR<BillingPlan[]>(
    getAllPlans,
    generalFetcher,
  );

  return {
    plans: data ?? [],
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}

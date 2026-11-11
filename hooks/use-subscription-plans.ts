import { getAllPlans } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { BillingPlan } from "@/types/billing";
import useSWR from "swr";

export default function useSubscriptionPlans() {
  const { data, error, isLoading, mutate } = useSWR<BillingPlan[]>(
    getAllPlans,
    generalFetcher,
  );

  const plans = data ?? [];

  return {
    plans,
    personalPro: plans.find((p) => p.code === "PERSONAL_PRO") ?? null,
    schoolPro: plans.find((p) => p.code === "SCHOOL_PRO") ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}

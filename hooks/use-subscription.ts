import { getSubscriptionKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { Subscription } from "@/types/billing";
import useSWR from "swr";

export default function useSubscription(shouldFetch = true) {
  const { data, error, isLoading, mutate } = useSWR<Subscription>(
    shouldFetch ? getSubscriptionKey : null,
    generalFetcher,
  );

  return {
    subscription: data ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}
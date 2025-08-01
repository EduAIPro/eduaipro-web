import api from "@/api/base";
import { getMe } from "@/api/keys";

import useSWR from "swr";

export default function useUser() {
  const fetcher = (url: string) => api.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR(getMe, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    refetch: mutate(getMe),
    error,
  };
}

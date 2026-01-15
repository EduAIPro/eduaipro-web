import api from "@/api/base";
import { getStaff } from "@/api/keys";
import { Staff } from "@/types/user";
import { useMemo } from "react";
import useSWR from "swr";

export default function useUser() {
  const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

  const { data, error, isLoading, mutate } = useSWR<Staff>(getStaff, fetcher);
  const { user, ...staff } = useMemo(
    () => data ?? { user: null, staff: null },
    [data]
  );
  return {
    user,
    staff,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    mutate,
    error,
  };
}

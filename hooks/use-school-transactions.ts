import { schoolTransactionsKey } from "@/api/keys";
import api from "@/api/base";
import { SchoolTransactionsData } from "@/types/school/billing";
import useSWR from "swr";

const fetchTransactions = ([url, page, limit, status]: [
  string,
  number,
  number,
  string,
]) =>
  api
    .get(url, {
      params: { page, limit, ...(status ? { status } : {}) },
    })
    .then((res) => res.data.data);

export default function useSchoolTransactions(
  page: number,
  status: string,
  limit = 10,
) {
  const { data, error, isLoading, mutate } = useSWR<SchoolTransactionsData>(
    [schoolTransactionsKey, page, limit, status],
    fetchTransactions,
  );

  return {
    transactions: data ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
    error,
  };
}

import { transactionsKey } from "@/api/keys";
import api from "@/api/base";
import { TransactionsData } from "@/types/billing";
import useSWR from "swr";

const fetchTransactions = ([url, page, limit, status]: [
  string,
  number,
  number,
  string,
]) =>
  api
    .get(url, { params: { page, limit, ...(status ? { status } : {}) } })
    .then((res) => res.data.data);

/** The signed-in teacher's own payments. */
export default function useTransactions(
  options: { page?: number; limit?: number; status?: string; enabled?: boolean } = {},
) {
  const { page = 1, limit = 10, status = "", enabled = true } = options;
  const { data, error, isLoading, mutate } = useSWR<TransactionsData>(
    enabled ? [transactionsKey, page, limit, status] : null,
    fetchTransactions,
  );

  return {
    transactions: data ?? null,
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
  };
}

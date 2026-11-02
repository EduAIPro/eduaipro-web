import { adminBillingTransactionsKey } from "@/api/keys";
import api from "@/api/base";
import { AdminTransactionsData } from "@/types/admin/billing";
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

export const ADMIN_TRANSACTIONS_PAGE_SIZE = 20;

export default function useAdminTransactions(page: number, status: string) {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<AdminTransactionsData>(
      [adminBillingTransactionsKey, page, ADMIN_TRANSACTIONS_PAGE_SIZE, status],
      fetchTransactions,
      { keepPreviousData: true },
    );

  return {
    transactions: data ?? null,
    isLoading,
    isFetching: isValidating,
    isError: !!error,
    refetch: () => mutate(),
    error,
  };
}

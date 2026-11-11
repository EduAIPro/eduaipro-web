import { adminInvoicesKey } from "@/api/keys";
import { generalFetcher } from "@/api/queries";
import { AdminInvoice } from "@/types/admin/billing";
import useSWR from "swr";

export default function useAdminInvoices() {
  const { data, error, isLoading, mutate } = useSWR<AdminInvoice[]>(
    adminInvoicesKey,
    generalFetcher,
  );

  return {
    invoices: data ?? [],
    isLoading,
    isError: !!error,
    refetch: () => mutate(),
  };
}

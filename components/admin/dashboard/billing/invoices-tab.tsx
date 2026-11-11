"use client";

import { format } from "date-fns";
import { adminMarkInvoicePaidKey } from "@/api/keys";
import { markInvoicePaid } from "@/api/mutations";
import { ConfirmDialog } from "@/components/school/dashboard/billing/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAdminInvoices from "@/hooks/use-admin-invoices";
import { formatKobo } from "@/lib/utils";
import { AdminInvoice, isAdminBillingError } from "@/types/admin/billing";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export const InvoicesTab = () => {
  const { invoices, isLoading, isError, refetch } = useAdminInvoices();
  const [paying, setPaying] = useState<AdminInvoice | null>(null);
  const { trigger, isMutating } = useSWRMutation(
    adminMarkInvoicePaidKey,
    markInvoicePaid,
  );

  const onConfirm = async () => {
    if (!paying) return;
    try {
      await trigger({ purchaseId: paying.id });
      toast.success(`${paying.invoiceNumber} marked as paid. Seats created.`);
      refetch();
    } catch (error) {
      toast.error(
        isAdminBillingError(error) ? error.message : "Couldn’t mark it as paid",
      );
    } finally {
      setPaying(null);
    }
  };

  if (isLoading) return <Skeleton className="h-48 w-full rounded-xl" />;

  if (isError) {
    return (
      <Card className="flex flex-col items-center gap-3 p-10 text-center">
        <p className="text-sm text-grey-500">Couldn’t load the invoices.</p>
        <Button variant="outline" onClick={refetch}>
          Try again
        </Button>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <h3 className="text-sm font-bold text-grey-800">Open invoices</h3>
        <p className="text-[11px] text-grey-500">
          Oldest first. Mark an invoice paid once the money has arrived; the
          school’s seats are created at that moment.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-grey-3 text-xs text-grey-500">
            <tr>
              {[
                "Invoice",
                "School",
                "Seats",
                "Per seat",
                "Total",
                "Requested",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-4 py-2.5 text-left font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.length ? (
              invoices.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="px-4 py-2.5 font-mono text-xs">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-4 py-2.5 font-medium text-grey-800">
                    {inv.school.institutionName}
                  </td>
                  <td className="px-4 py-2.5">{inv.quantity}</td>
                  <td className="px-4 py-2.5">
                    {formatKobo(inv.unitPriceKobo)}
                  </td>
                  <td className="px-4 py-2.5 font-semibold">
                    {formatKobo(inv.totalKobo)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-grey-500">
                    {format(new Date(inv.requestedAt), "do MMM, yyyy")}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <Button size="sm" onClick={() => setPaying(inv)}>
                      Mark paid
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-xs text-grey-500"
                >
                  No open invoices.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={!!paying}
        onOpenChange={(v) => !v && setPaying(null)}
        title="Mark this invoice as paid?"
        description={
          paying
            ? `Confirm that ${formatKobo(paying.totalKobo)} from ${paying.school.institutionName} has arrived for ${paying.invoiceNumber}. ${paying.quantity} seats are created straight away and this can’t be undone here.`
            : ""
        }
        confirmLabel="Yes, mark paid"
        loading={isMutating}
        onConfirm={onConfirm}
      />
    </Card>
  );
};

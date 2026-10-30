"use client";

import { cancelSchoolSeatPurchaseKey } from "@/api/keys";
import { cancelSchoolSeatPurchase } from "@/api/mutations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { invalidateSeats } from "@/lib/school-invalidate";
import { formatMoney } from "@/lib/utils";
import { SeatPurchase } from "@/types/school/billing";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { ConfirmDialog } from "./confirm-dialog";

const fmt = (iso: string | null) => (iso ? format(new Date(iso), "dd MMM yyyy") : "—");

export const PurchasesList = ({ purchases }: { purchases: SeatPurchase[] }) => {
  const [cancelling, setCancelling] = useState<SeatPurchase | null>(null);
  const { trigger, isMutating } = useSWRMutation(
    cancelSchoolSeatPurchaseKey,
    cancelSchoolSeatPurchase,
  );

  const onCancel = async () => {
    if (!cancelling) return;
    try {
      const res = await trigger({ purchaseId: cancelling.id });
      toast.success(`Seats stay active until ${fmt(res.accessUntil)}`);
      invalidateSeats();
      setCancelling(null);
    } catch (error) {
      toast.error(schoolBillingMessage(error));
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <h3 className="text-sm font-bold text-grey-800">Purchases</h3>
        <p className="text-[11px] text-grey-500">
          Each purchase has its own term and renewal date.
        </p>
      </div>
      {purchases.length ? (
        <ul>
          {purchases.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b px-4 py-3 last:border-b-0"
            >
              <div className="min-w-32">
                <p className="text-sm font-semibold text-grey-800">
                  {p.quantity} × {p.tier === "BASIC" ? "School Basic" : "School Pro"}
                </p>
                <p className="text-[11px] text-grey-500">
                  {formatMoney(p.unitPriceKobo / 100)} per seat
                </p>
              </div>
              <div className="flex-1 text-xs text-grey-500">
                {p.status === "PENDING" ? (
                  <span className="font-medium text-amber-700">
                    Awaiting payment (expires after 24h)
                  </span>
                ) : (
                  <>
                    <p>Renews {fmt(p.renewsAt)}</p>
                    <p>Auto-renew {p.autoRenew ? "on" : "off"}</p>
                  </>
                )}
              </div>
              {p.card ? (
                <p className="text-xs text-grey-500">
                  {p.card.brand} ·· {p.card.last4}
                  {p.card.bank ? ` · ${p.card.bank}` : ""}
                </p>
              ) : null}
              {p.status === "ACTIVE" && p.autoRenew ? (
                <Button variant="outline" size="sm" onClick={() => setCancelling(p)}>
                  Cancel auto-renew
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-6 text-center text-xs text-grey-500">No purchases yet</p>
      )}
      <ConfirmDialog
        open={!!cancelling}
        onOpenChange={(v) => !v && setCancelling(null)}
        title="Cancel auto-renew?"
        description="These seats keep working until the end of their current term, then stop renewing."
        confirmLabel="Cancel auto-renew"
        destructive
        loading={isMutating}
        onConfirm={onCancel}
      />
    </Card>
  );
};

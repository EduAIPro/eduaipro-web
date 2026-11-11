"use client";

import { renewSchoolSeatPurchaseKey } from "@/api/keys";
import { renewSchoolSeats } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { daysUntil } from "@/lib/billing-dates";
import { format } from "date-fns";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { CHECKOUT_RETURN_PATH, saveCheckout } from "@/lib/school-checkout";
import { formatKobo } from "@/lib/utils";
import { SeatPurchase } from "@/types/school/billing";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

const RENEW_SOON_DAYS = 90;

export const PurchasesList = ({
  purchases,
  canWrite = true,
}: {
  purchases: SeatPurchase[];
  /** false when the school is read-only; renewing is still allowed */
  canWrite?: boolean;
}) => {
  const [renewingId, setRenewingId] = useState<string | null>(null);
  const { trigger } = useSWRMutation(
    renewSchoolSeatPurchaseKey,
    renewSchoolSeats,
  );

  const onRenew = async (p: SeatPurchase) => {
    setRenewingId(p.id);
    try {
      const res = await trigger({
        purchaseId: p.id,
        callbackUrl: `${window.location.origin}${CHECKOUT_RETURN_PATH}`,
      });
      toast.message(
        `Renewing ${res.quote.quantity} seats for ${formatKobo(res.amountKobo, res.currency)}`,
      );
      saveCheckout({
        reference: res.reference,
        seatPurchaseId: res.seatPurchaseId,
      });
      window.location.href = res.authorizationUrl;
    } catch (error) {
      toast.error(schoolBillingMessage(error));
      setRenewingId(null);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <h3 className="text-sm font-bold text-grey-800">Purchases</h3>
        <p className="text-[11px] text-grey-500">
          Each block has its own end date. Renewing adds another 24 months to
          that block; nothing renews by itself.
        </p>
      </div>
      {purchases.length ? (
        <ul>
          {purchases.map((p) => {
            const left = daysUntil(p.endsAt);
            const soon =
              p.status === "ACTIVE" && left !== null && left <= RENEW_SOON_DAYS;
            return (
              <li
                key={p.id}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b px-4 py-3 last:border-b-0"
              >
                <div className="min-w-32">
                  <p className="text-sm font-semibold text-grey-800">
                    {p.quantity} × School Pro
                  </p>
                  <p className="text-[11px] text-grey-500">
                    {p.unitPriceKobo !== null
                      ? `${formatKobo(p.unitPriceKobo)} per seat`
                      : "Price set at payment"}
                    {p.invoiceNumber ? ` · ${p.invoiceNumber}` : ""}
                  </p>
                </div>
                <div className="flex-1 text-xs text-grey-500">
                  {p.status === "PENDING" ? (
                    p.invoiceNumber ? (
                      <span className="font-medium text-amber-700">
                        Awaiting payment
                        {p.invoiceRequestedAt
                          ? ` (invoice requested ${format(new Date(p.invoiceRequestedAt), "do MMM, yyyy")})`
                          : ""}
                      </span>
                    ) : (
                      <span className="font-medium text-amber-700">
                        Payment pending
                      </span>
                    )
                  ) : (
                    <>
                      <p>
                        Seats end{" "}
                        {p.endsAt
                          ? format(new Date(p.endsAt), "do MMM, yyyy")
                          : "—"}
                      </p>
                      {soon ? (
                        <p className="font-medium text-amber-700">
                          {left !== null && left <= 0
                            ? "Ending today"
                            : `Ends in ${left} day${left === 1 ? "" : "s"}`}
                        </p>
                      ) : null}
                    </>
                  )}
                </div>
                {p.status === "ACTIVE" ? (
                  <Button
                    variant={soon ? "default" : "outline"}
                    size="sm"
                    loading={renewingId === p.id}
                    disabled={!!renewingId}
                    onClick={() => onRenew(p)}
                  >
                    Renew
                  </Button>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="p-6 text-center text-xs text-grey-500">
          No purchases yet
        </p>
      )}
    </Card>
  );
};

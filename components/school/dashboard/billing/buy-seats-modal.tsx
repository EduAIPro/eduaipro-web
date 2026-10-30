"use client";

import { schoolSeatPurchasesKey } from "@/api/keys";
import { buySchoolSeats } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import useSubscriptionPlans from "@/hooks/use-subscription-plans";
import { BillingPlan } from "@/types/billing";
import { CHECKOUT_RETURN_PATH, saveCheckout } from "@/lib/school-checkout";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { formatMoney } from "@/lib/utils";
import { BuySeatsResponse, SeatTier } from "@/types/school/billing";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type BuySeatsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type TierOption = {
  value: SeatTier;
  title: string;
  note: string;
  priceKobo: number | null;
};

const toTierOption = (plan: BillingPlan): TierOption => ({
  value: plan.code.endsWith("_PRO") ? "PRO" : "BASIC",
  title: plan.name,
  note: plan.details.description,
  priceKobo:
    typeof plan.current?.amountKobo === "number"
      ? plan.current.amountKobo
      : null,
});

export const BuySeatsModal = ({ open, onOpenChange }: BuySeatsModalProps) => {
  const [tier, setTier] = useState<SeatTier>("BASIC");
  const [quantity, setQuantity] = useState("1");
  const [checkout, setCheckout] = useState<BuySeatsResponse | null>(null);

  const { plans, isLoading: plansLoading } = useSubscriptionPlans();
  const tiers = useMemo(
    () => plans.filter((p) => p.code.includes("SCHOOL")).map(toTierOption),
    [plans],
  );

  // keep the selection valid if the available plans don't include BASIC
  useEffect(() => {
    if (tiers.length && !tiers.some((t) => t.value === tier)) {
      setTier(tiers[0].value);
    }
  }, [tiers, tier]);

  const { trigger, isMutating } = useSWRMutation(
    schoolSeatPurchasesKey,
    buySchoolSeats,
  );

  const qty = Number(quantity);
  const valid =
    tiers.length > 0 && Number.isInteger(qty) && qty >= 1 && qty <= 5000;

  const reset = (v: boolean) => {
    if (!v) setCheckout(null);
    onOpenChange(v);
  };

  const onContinue = async () => {
    if (!valid || isMutating) return;
    try {
      const res = await trigger({
        tier,
        quantity: qty,
        termMonths: 24,
        callbackUrl: `${window.location.origin}${CHECKOUT_RETURN_PATH}`,
      });
      setCheckout(res);
    } catch (error) {
      toast.error(schoolBillingMessage(error));
    }
  };

  const onPay = () => {
    if (!checkout) return;
    saveCheckout({
      reference: checkout.reference,
      seatPurchaseId: checkout.seatPurchaseId,
    });
    window.location.href = checkout.authorizationUrl;
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="max-w-md">
        {checkout ? (
          <>
            <DialogHeader>
              <DialogTitle>Confirm your purchase</DialogTitle>
              <DialogDescription>
                You’ll be redirected to pay on Paystack’s secure page.
              </DialogDescription>
            </DialogHeader>
            <dl className="space-y-2 rounded-lg border p-4 text-sm">
              <Row
                label="Plan"
                value={tiers.find((t) => t.value === tier)?.title ?? tier}
              />
              <Row label="Seats" value={String(qty)} />
              <Row label="Term" value="24 months (2 years)" />
              <Row
                label="Total"
                value={formatMoney(
                  checkout.amountKobo / 100,
                  checkout.currency,
                )}
                bold
              />
            </dl>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setCheckout(null)}>
                Back
              </Button>
              <Button onClick={onPay}>Pay with Paystack</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Buy seats</DialogTitle>
              <DialogDescription>
                Each purchase has its own term and renewal date.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <RadioGroup
                value={tier}
                onValueChange={(v) => setTier(v as SeatTier)}
                className="grid gap-2"
              >
                {plansLoading ? (
                  <Skeleton className="h-14 w-full" />
                ) : tiers.length ? (
                  tiers.map((t) => (
                    <Label
                      key={t.value}
                      htmlFor={`tier-${t.value}`}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-[:checked]:border-[#1A56DB] has-[:checked]:bg-[#EFF4FE]"
                    >
                      <RadioGroupItem id={`tier-${t.value}`} value={t.value} />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold">
                          {t.title}
                        </span>
                        <span className="block text-xs font-normal text-grey-500">
                          {t.note}
                        </span>
                      </span>
                      {t.priceKobo !== null ? (
                        <span className="text-xs font-semibold">
                          {formatMoney(t.priceKobo / 100)}
                          <span className="font-normal text-grey-500">
                            {" "}
                            / seat
                          </span>
                        </span>
                      ) : null}
                    </Label>
                  ))
                ) : (
                  <p className="text-sm text-grey-500">
                    School plans aren’t available right now.
                  </p>
                )}
              </RadioGroup>
              <div className="space-y-1.5">
                <Label htmlFor="seat-qty">Seats (1–5000)</Label>
                <Input
                  id="seat-qty"
                  type="number"
                  min={1}
                  max={5000}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              {/* <div className="space-y-1.5">
                  <Label htmlFor="seat-term">Term in months (1–36)</Label>
                  <Input
                    id="seat-term"
                    type="number"
                    min={1}
                    max={36}
                    value={termMonths}
                    onChange={(e) => setTermMonths(e.target.value)}
                  />
                </div> */}
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => reset(false)}>
                Cancel
              </Button>
              <Button
                disabled={!valid || isMutating}
                loading={isMutating}
                onClick={onContinue}
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Row = ({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <dt className="text-grey-500">{label}</dt>
    <dd className={bold ? "font-bold" : "font-medium"}>{value}</dd>
  </div>
);

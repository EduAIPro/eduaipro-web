"use client";

import { adminSetPlanPriceKey } from "@/api/keys";
import { setAdminPlanPrice } from "@/api/mutations";
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
import {
  isLargeChange,
  isPriceInRange,
  localDateTimeMin,
  MAX_PRICE_KOBO,
  MIN_PRICE_KOBO,
  nairaToKobo,
  percentChange,
  planIdOf,
} from "@/lib/admin-billing";
import { formatMoney } from "@/lib/utils";
import {
  AdminBillingPlan,
  isAdminBillingError,
  SetPlanPriceResponse,
} from "@/types/admin/billing";
import { format } from "date-fns";
import { MegaphoneIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type Step = "form" | "confirm" | "notify";
type Mode = "now" | "later";

type SetPriceDialogProps = {
  plan: AdminBillingPlan | null;
  onOpenChange: (open: boolean) => void;
  onChanged: () => void;
};

export const SetPriceDialog = ({
  plan,
  onOpenChange,
  onChanged,
}: SetPriceDialogProps) => {
  const [step, setStep] = useState<Step>("form");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<Mode>("now");
  const [when, setWhen] = useState("");
  const [result, setResult] = useState<SetPlanPriceResponse | null>(null);

  const { trigger, isMutating } = useSWRMutation(
    adminSetPlanPriceKey,
    setAdminPlanPrice,
  );

  // fresh state every time the dialog opens for a plan
  useEffect(() => {
    if (!plan) return;
    setStep("form");
    setAmount("");
    setMode("now");
    setWhen("");
    setResult(null);
  }, [plan]);

  if (!plan) {
    return <Dialog open={false} onOpenChange={onOpenChange} />;
  }

  const current = plan.current.amountKobo;
  const currency = plan.current.currency;
  const newKobo = nairaToKobo(amount);
  const amountOk = amount !== "" && isPriceInRange(newKobo);
  const unchanged = amountOk && newKobo === current;
  const whenDate = when ? new Date(when) : null;
  const whenOk = mode === "now" || (!!whenDate && whenDate.getTime() > Date.now());
  const canSubmit = amountOk && !unchanged && whenOk && !isMutating;
  const isSchool = plan.details.payer === "SCHOOL";

  const submit = async (confirm: boolean) => {
    if (!canSubmit) return;
    if (!confirm && isLargeChange(current, newKobo)) {
      setStep("confirm");
      return;
    }
    try {
      const res = await trigger({
        planId: planIdOf(plan),
        amountKobo: newKobo,
        confirm,
        ...(mode === "later" && whenDate
          ? { effectiveAt: whenDate.toISOString() }
          : {}),
      });
      onChanged();
      toast.success(
        mode === "later" && whenDate
          ? `New price scheduled for ${format(whenDate, "dd MMM yyyy, HH:mm")}`
          : "Price updated",
      );
      if (res.affectedSubscribers > 0) {
        setResult(res);
        setStep("notify");
      } else {
        onOpenChange(false);
      }
    } catch (error) {
      if (isAdminBillingError(error) && error.needsConfirm && !confirm) {
        // the server judged the change large even if our estimate did not
        setStep("confirm");
        return;
      }
      setStep("form");
      toast.error(isAdminBillingError(error) ? error.message : "Couldn’t change the price");
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Change price: {plan.name}</DialogTitle>
              <DialogDescription>
                Current price {formatMoney(current / 100, currency)} per{" "}
                {plan.details.termMonths} months.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-price">New price ({currency})</Label>
                <Input
                  id="new-price"
                  type="number"
                  inputMode="decimal"
                  min={MIN_PRICE_KOBO / 100}
                  max={MAX_PRICE_KOBO / 100}
                  step="0.01"
                  placeholder="e.g. 75000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-invalid={amount !== "" && !amountOk}
                />
                {amount !== "" && !amountOk ? (
                  <p className="text-xs text-red-600">
                    Enter an amount from {formatMoney(MIN_PRICE_KOBO / 100)} to{" "}
                    {formatMoney(MAX_PRICE_KOBO / 100)}.
                  </p>
                ) : unchanged ? (
                  <p className="text-xs text-amber-700">
                    That’s the current price.
                  </p>
                ) : amountOk ? (
                  <p className="text-xs text-grey-500">
                    {percentChange(current, newKobo) >= 0 ? "+" : ""}
                    {percentChange(current, newKobo)}% from the current price
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label>When should it apply?</Label>
                <RadioGroup
                  value={mode}
                  onValueChange={(v) => setMode(v as Mode)}
                  className="grid gap-2"
                >
                  <Label
                    htmlFor="mode-now"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-[:checked]:border-[#1A56DB] has-[:checked]:bg-[#EFF4FE]"
                  >
                    <RadioGroupItem id="mode-now" value="now" />
                    <span>
                      <span className="block text-sm font-semibold">
                        Straight away
                      </span>
                      <span className="block text-xs font-normal text-grey-500">
                        New purchases and renewals use it immediately.
                      </span>
                    </span>
                  </Label>
                  <Label
                    htmlFor="mode-later"
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 has-[:checked]:border-[#1A56DB] has-[:checked]:bg-[#EFF4FE]"
                  >
                    <RadioGroupItem id="mode-later" value="later" />
                    <span>
                      <span className="block text-sm font-semibold">
                        From a future date
                      </span>
                      <span className="block text-xs font-normal text-grey-500">
                        Gives subscribers notice before they’re charged.
                      </span>
                    </span>
                  </Label>
                </RadioGroup>
                {mode === "later" ? (
                  <div className="space-y-1.5">
                    <Input
                      aria-label="Effective date and time"
                      type="datetime-local"
                      min={localDateTimeMin()}
                      value={when}
                      onChange={(e) => setWhen(e.target.value)}
                    />
                    {when && !whenOk ? (
                      <p className="text-xs text-red-600">
                        Choose a date and time in the future.
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <p className="rounded-lg bg-grey-3 p-3 text-xs leading-relaxed text-grey-500">
                {isSchool
                  ? "School seats already bought keep their price until they renew. The new price applies to new purchases and to renewals that run after it takes effect."
                  : "Renewals charge whatever price is in force on the day they run. Schedule a future date to give Personal Pro subscribers notice."}
              </p>
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                disabled={!canSubmit}
                loading={isMutating}
                onClick={() => submit(false)}
              >
                {mode === "later" ? "Schedule price" : "Update price"}
              </Button>
            </DialogFooter>
          </>
        ) : step === "confirm" ? (
          <>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This changes the price by more than 3×. Double-check for a typo
                before you continue.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center gap-3 rounded-lg border p-4 text-lg font-bold">
              <span className="text-grey-500">
                {formatMoney(current / 100, currency)}
              </span>
              <span aria-hidden>→</span>
              <span>{formatMoney(newKobo / 100, currency)}</span>
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setStep("form")}>
                Go back
              </Button>
              <Button
                variant="destructive"
                loading={isMutating}
                onClick={() => submit(true)}
              >
                Yes, change the price
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <MegaphoneIcon size={20} />
              </div>
              <DialogTitle>Let your subscribers know</DialogTitle>
              <DialogDescription>
                {result?.affectedSubscribers} Personal Pro subscriber
                {result?.affectedSubscribers === 1 ? "" : "s"} will be charged{" "}
                {formatMoney(newKobo / 100, currency)} on their next renewal
                {mode === "later" && whenDate
                  ? ` after ${format(whenDate, "dd MMM yyyy")}`
                  : ""}
                . Send them a message so the change isn’t a surprise.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Done
              </Button>
              <Button asChild>
                <Link href="/admin/messages">Write a message</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

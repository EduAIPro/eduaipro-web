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
  BandRow,
  bandsError,
  bandsToRows,
  isBandedPlan,
  isLargeChange,
  isPriceInRange,
  localDateTimeMin,
  MAX_PRICE_KOBO,
  MIN_PRICE_KOBO,
  nairaToKobo,
  percentChange,
  planIdOf,
  rowsToBands,
} from "@/lib/admin-billing";
import { formatKobo } from "@/lib/utils";
import { AdminBillingPlan, isAdminBillingError } from "@/types/admin/billing";
import { format } from "date-fns";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

type Step = "form" | "confirm";
type Mode = "now" | "later";

type SetPriceDialogProps = {
  plan: AdminBillingPlan | null;
  onOpenChange: (open: boolean) => void;
  onChanged: () => void;
};

const EMPTY_ROW: BandRow = { min: "", max: "", rate: "" };

export const SetPriceDialog = ({
  plan,
  onOpenChange,
  onChanged,
}: SetPriceDialogProps) => {
  const [step, setStep] = useState<Step>("form");
  const [amount, setAmount] = useState("");
  const [rows, setRows] = useState<BandRow[]>([EMPTY_ROW]);
  const [mode, setMode] = useState<Mode>("now");
  const [when, setWhen] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    adminSetPlanPriceKey,
    setAdminPlanPrice,
  );

  // fresh state every time the dialog opens for a plan; bands start from the
  // ones in force so an admin edits rather than retypes
  useEffect(() => {
    if (!plan) return;
    setStep("form");
    setAmount("");
    setRows(
      plan.current?.bands?.length
        ? bandsToRows(plan.current.bands)
        : [EMPTY_ROW],
    );
    setMode("now");
    setWhen("");
  }, [plan]);

  if (!plan) {
    return <Dialog open={false} onOpenChange={onOpenChange} />;
  }

  const banded = isBandedPlan(plan);
  const currency = plan.current?.currency ?? plan.currency;
  const termMonths = plan.details?.termMonths ?? 24;

  // For banded plans the headline rate is the first band’s.
  const current = plan.current
    ? banded
      ? (plan.current.bands?.[0]?.unitAmountKobo ?? plan.current.amountKobo)
      : plan.current.amountKobo
    : 0;
  const newKobo = banded
    ? (rowsToBands(rows)[0]?.unitAmountKobo ?? 0)
    : nairaToKobo(amount);

  const flatOk = amount !== "" && isPriceInRange(newKobo);
  const flatUnchanged = flatOk && newKobo === current;
  const bandsProblem = banded ? bandsError(rows) : null;
  const priceOk = banded ? !bandsProblem : flatOk && !flatUnchanged;

  const whenDate = when ? new Date(when) : null;
  const whenOk =
    mode === "now" || (!!whenDate && whenDate.getTime() > Date.now());
  const canSubmit = priceOk && whenOk && !isMutating;
  const hasCurrent = current > 0;

  const setRow = (i: number, patch: Partial<BandRow>) =>
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  const submit = async (confirm: boolean) => {
    if (!canSubmit) return;
    if (!confirm && hasCurrent && isLargeChange(current, newKobo)) {
      setStep("confirm");
      return;
    }
    try {
      await trigger({
        planId: planIdOf(plan),
        ...(banded ? { bands: rowsToBands(rows) } : { amountKobo: newKobo }),
        confirm,
        ...(mode === "later" && whenDate
          ? { effectiveAt: whenDate.toISOString() }
          : {}),
      });
      onChanged();
      toast.success(
        mode === "later" && whenDate
          ? `New price scheduled for ${format(whenDate, "do MMM, yyyy, HH:mm")}`
          : "Price updated",
      );
      onOpenChange(false);
    } catch (error) {
      if (isAdminBillingError(error) && error.needsConfirm && !confirm) {
        // the server judged the change large even if our estimate did not
        setStep("confirm");
        return;
      }
      setStep("form");
      toast.error(
        isAdminBillingError(error)
          ? error.message
          : "Couldn’t change the price",
      );
    }
  };

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Change price: {plan.name}</DialogTitle>
              <DialogDescription>
                {hasCurrent
                  ? banded
                    ? `Prices are per seat, for ${termMonths} months.`
                    : `Current price ${formatKobo(current, currency)} for ${termMonths} months.`
                  : "No price is set yet."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {banded ? (
                <div className="space-y-2">
                  <Label>Price per seat by order size</Label>
                  <div className="grid grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-2 text-[11px] font-medium text-grey-500">
                    <span>From (seats)</span>
                    <span>To (seats)</span>
                    <span>Rate ({currency})</span>
                    <span className="w-8" />
                  </div>
                  {rows.map((r, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_1fr_1.2fr_auto] items-center gap-2"
                    >
                      <Input
                        aria-label={`Band ${i + 1} minimum`}
                        type="number"
                        min={1}
                        // later bands start where the previous one ends
                        readOnly={i > 0}
                        value={
                          i === 0
                            ? r.min
                            : rows[i - 1].max !== ""
                              ? String(Number(rows[i - 1].max) + 1)
                              : ""
                        }
                        onChange={(e) => setRow(i, { min: e.target.value })}
                        className={i > 0 ? "bg-grey-3" : undefined}
                      />
                      <Input
                        aria-label={`Band ${i + 1} maximum`}
                        type="number"
                        min={1}
                        placeholder="max"
                        value={r.max}
                        onChange={(e) => setRow(i, { max: e.target.value })}
                      />
                      <Input
                        aria-label={`Band ${i + 1} rate per seat`}
                        type="number"
                        min={MIN_PRICE_KOBO / 100}
                        step="0.01"
                        placeholder="e.g. 25000"
                        value={r.rate}
                        onChange={(e) => setRow(i, { rate: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove band ${i + 1}`}
                        disabled={rows.length === 1}
                        onClick={() =>
                          setRows((rs) => rs.filter((_, idx) => idx !== i))
                        }
                      >
                        <Trash2Icon className="size-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setRows((rs) => [...rs, EMPTY_ROW])}
                  >
                    <PlusIcon className="size-4" /> Add band
                  </Button>
                  {bandsProblem && rows.some((r) => r.rate || r.max) ? (
                    <p className="text-xs text-red-600">{bandsProblem}</p>
                  ) : (
                    <p className="text-xs text-grey-500">
                      The first band’s minimum is the smallest order; the last
                      band’s maximum is the largest. Bigger orders are Custom.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <Label htmlFor="new-price">New price ({currency})</Label>
                  <Input
                    id="new-price"
                    type="number"
                    inputMode="decimal"
                    min={MIN_PRICE_KOBO / 100}
                    max={MAX_PRICE_KOBO / 100}
                    step="0.01"
                    placeholder="e.g. 30000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-invalid={amount !== "" && !flatOk}
                  />
                  {amount !== "" && !flatOk ? (
                    <p className="text-xs text-red-600">
                      Enter an amount from {formatKobo(MIN_PRICE_KOBO)} to{" "}
                      {formatKobo(MAX_PRICE_KOBO)}.
                    </p>
                  ) : flatUnchanged ? (
                    <p className="text-xs text-amber-700">
                      That’s the current price.
                    </p>
                  ) : flatOk && hasCurrent ? (
                    <p className="text-xs text-grey-500">
                      {percentChange(current, newKobo) >= 0 ? "+" : ""}
                      {percentChange(current, newKobo)}% from the current price
                    </p>
                  ) : null}
                </div>
              )}

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
                        New purchases use it immediately.
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
                        Schedule the change; it can’t be in the past.
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
                Nothing renews by itself and seats already bought keep the price
                they were bought at. The new price applies to new orders and to
                renewals started after it takes effect.
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
        ) : (
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
                {formatKobo(current, currency)}
              </span>
              <span aria-hidden>→</span>
              <span>{formatKobo(newKobo, currency)}</span>
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
        )}
      </DialogContent>
    </Dialog>
  );
};

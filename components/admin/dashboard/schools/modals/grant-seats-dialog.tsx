"use client";

import { adminBillingTransactionsKey, adminGrantSeatsKey } from "@/api/keys";
import { grantSchoolSeats } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { nairaToKobo } from "@/lib/admin-billing";
import { isAdminBillingError } from "@/types/admin/billing";
import { useState } from "react";
import { toast } from "sonner";
import { mutate as globalMutate } from "swr";
import useSWRMutation from "swr/mutation";

type Props = {
  schoolId: string;
  schoolName: string;
  refetch: VoidFunction;
};

const DEFAULT_TERM = 24;
const REF_RE = /^[A-Za-z0-9_-]+$/;

const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString("en-NG")}`;

const lagosDate = (iso: string) =>
  new Intl.DateTimeFormat("en-NG", {
    dateStyle: "long",
    timeZone: "Africa/Lagos",
  }).format(new Date(iso));

export const GrantSeatsDialog = ({ schoolId, schoolName, refetch }: Props) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "confirm">("form");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
    adminGrantSeatsKey(schoolId),
    grantSchoolSeats,
  );

  const reset = () => {
    setStep("form");
    setQuantity("");
    setAmount("");
    setTerm("");
    setReference("");
    setNote("");
    setServerErrors([]);
  };

  const qty = Number(quantity);
  const kobo = amount.trim() === "" ? 0 : nairaToKobo(amount);
  const months = term.trim() === "" ? DEFAULT_TERM : Number(term);
  const ref = reference.trim();

  const errors = {
    quantity:
      quantity !== "" &&
      (!Number.isInteger(qty) || qty < 1 || qty > 5000)
        ? "Enter a whole number from 1 to 5000."
        : null,
    amount:
      amount !== "" && (!Number.isFinite(kobo) || kobo < 0)
        ? "Enter 0 or more."
        : null,
    term:
      term !== "" && (!Number.isInteger(months) || months < 1 || months > 60)
        ? "Enter a whole number from 1 to 60."
        : null,
    reference:
      ref !== "" && (!REF_RE.test(ref) || ref.length > 100)
        ? "Letters, digits, _ and - only (max 100)."
        : null,
    note: note.length > 500 ? "Max 500 characters." : null,
  };
  const valid =
    quantity !== "" && !Object.values(errors).some(Boolean);

  const submit = async () => {
    if (!valid || isMutating) return;
    setServerErrors([]);
    try {
      const res = await trigger({
        quantity: qty,
        ...(kobo > 0 ? { amountKobo: kobo } : {}),
        ...(term.trim() !== "" ? { termMonths: months } : {}),
        ...(ref ? { paymentReference: ref } : {}),
        ...(note.trim() ? { note: note.trim() } : {}),
      });
      toast.success(
        `Seats granted. Reference ${res.reference}, valid until ${lagosDate(res.endsAt)}.`,
        { duration: 8000 },
      );
      setOpen(false);
      reset();
      refetch();
      globalMutate(
        (key) =>
          Array.isArray(key) && key[0] === adminBillingTransactionsKey,
      );
    } catch (error) {
      setStep("form");
      if (!isAdminBillingError(error)) {
        toast.error("Couldn’t grant seats");
        return;
      }
      if (error.status === 400) {
        setServerErrors(error.message.split(/,\s*/).filter(Boolean));
      } else if (error.status === 409) {
        toast.error(
          `${error.message} Check the transactions list before trying again.`,
        );
      } else {
        // 401 is handled by the global re-login flow; 403/404 show the message
        toast.error(error.message);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (isMutating) return;
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Grant seats</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Grant seats</DialogTitle>
              <DialogDescription>
                Give {schoolName} seats without Paystack checkout, for a manual
                payment or a sponsorship.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="grant-qty">Number of seats</Label>
                <Input
                  id="grant-qty"
                  type="number"
                  min={1}
                  max={5000}
                  step={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  aria-invalid={!!errors.quantity}
                />
                {errors.quantity ? (
                  <p className="text-xs text-red-600">{errors.quantity}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="grant-amount">Amount paid (₦)</Label>
                <Input
                  id="grant-amount"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  placeholder="Leave empty for a sponsorship"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-invalid={!!errors.amount}
                />
                {errors.amount ? (
                  <p className="text-xs text-red-600">{errors.amount}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="grant-term">Term (months)</Label>
                <Input
                  id="grant-term"
                  type="number"
                  min={1}
                  max={60}
                  step={1}
                  placeholder={String(DEFAULT_TERM)}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  aria-invalid={!!errors.term}
                />
                {errors.term ? (
                  <p className="text-xs text-red-600">{errors.term}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="grant-ref">Payment reference (optional)</Label>
                <Input
                  id="grant-ref"
                  maxLength={100}
                  placeholder="e.g. TRF-20261111-0042"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  aria-invalid={!!errors.reference}
                />
                {errors.reference ? (
                  <p className="text-xs text-red-600">{errors.reference}</p>
                ) : (
                  <p className="text-xs text-grey-500">
                    A reference can only be used once, which prevents a double
                    grant.
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="grant-note">Note (optional)</Label>
                <Input
                  id="grant-note"
                  maxLength={500}
                  placeholder="e.g. Paid by bank transfer, receipt 123"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              {serverErrors.length ? (
                <ul className="list-disc space-y-0.5 rounded-lg bg-red-50 p-3 pl-6 text-xs text-red-700">
                  {serverErrors.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <DialogFooter className="gap-2 sm:gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={!valid} onClick={() => setStep("confirm")}>
                Review
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Confirm grant</DialogTitle>
              <DialogDescription>
                This creates real seats and can’t be undone from here.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-1 rounded-lg border p-4 text-sm">
              <p className="font-semibold text-grey-800">
                Grant {qty} seat{qty === 1 ? "" : "s"} to {schoolName} for{" "}
                {months} month{months === 1 ? "" : "s"}.
              </p>
              <p className="text-grey-500">
                Amount recorded: {naira(kobo)}
                {kobo === 0 ? " (sponsorship)" : ""}
              </p>
              {ref ? (
                <p className="font-mono text-xs text-grey-500">
                  Reference: {ref}
                </p>
              ) : null}
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                variant="outline"
                disabled={isMutating}
                onClick={() => setStep("form")}
              >
                Go back
              </Button>
              <Button loading={isMutating} disabled={isMutating} onClick={submit}>
                Grant seats
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

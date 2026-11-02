"use client";

import { schoolSeatPurchasesKey } from "@/api/keys";
import { buySchoolSeats } from "@/api/mutations";
import { SeatCalculator } from "@/components/billing/seat-calculator";
import { Button } from "@/components/ui/button";
import useSeatQuote from "@/hooks/use-seat-quote";
import { schoolBillingMessage } from "@/lib/school-billing-errors";
import { CHECKOUT_RETURN_PATH, saveCheckout } from "@/lib/school-checkout";
import { formatKobo } from "@/lib/utils";
import {
  BuySeatsResponse,
  CheckoutResponse,
  InvoiceResponse,
  isInvoiceResponse,
} from "@/types/school/billing";
import { CheckCircle2Icon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

const DEFAULT_SEATS = 20;

type Step = "pick" | "confirm" | "invoice";

export type SeatPurchaseFlowProps = {
  initialQuantity?: number;
  /** extra actions under the buttons, e.g. “try the free demo” */
  footer?: ReactNode;
  onCancel?: () => void;
  onInvoiceDone?: () => void;
};

/**
 * The whole “choose seats, then pay online or ask for an invoice” journey.
 * Used inside the Buy seats dialog and on the pay-first paywall.
 */
export function SeatPurchaseFlow({
  initialQuantity = DEFAULT_SEATS,
  footer,
  onCancel,
  onInvoiceDone,
}: SeatPurchaseFlowProps) {
  const [step, setStep] = useState<Step>("pick");
  const [quantity, setQuantity] = useState(initialQuantity);
  const [checkout, setCheckout] = useState<CheckoutResponse | null>(null);
  const [invoice, setInvoice] = useState<InvoiceResponse | null>(null);
  const [pending, setPending] = useState<"online" | "invoice" | null>(null);

  const { quote, isStale, isError } = useSeatQuote(quantity);
  const { trigger } = useSWRMutation(schoolSeatPurchasesKey, buySchoolSeats);

  const limits = quote?.limits ?? { min: 5, max: 299 };
  const valid =
    Number.isInteger(quantity) &&
    quantity >= limits.min &&
    quantity <= limits.max &&
    quote?.quantity === quantity;

  const start = async (mode: "online" | "invoice") => {
    if (!valid || pending) return;
    setPending(mode);
    try {
      const res: BuySeatsResponse = await trigger({
        quantity,
        ...(mode === "invoice"
          ? { invoice: true }
          : {
              callbackUrl: `${window.location.origin}${CHECKOUT_RETURN_PATH}`,
            }),
      });
      if (isInvoiceResponse(res)) {
        setInvoice(res);
        setStep("invoice");
      } else {
        setCheckout(res);
        setStep("confirm");
      }
    } catch (error) {
      toast.error(schoolBillingMessage(error));
    } finally {
      setPending(null);
    }
  };

  const pay = () => {
    if (!checkout) return;
    saveCheckout({
      reference: checkout.reference,
      seatPurchaseId: checkout.seatPurchaseId,
    });
    window.location.href = checkout.authorizationUrl;
  };

  if (step === "confirm" && checkout) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold">Confirm your purchase</h3>
          <p className="text-sm text-grey-500">
            You’ll pay on Paystack’s secure page by card or bank transfer.
          </p>
        </div>
        <Summary
          rows={[
            ["Plan", "School Pro"],
            ["Seats", String(checkout.quote.quantity)],
            [
              "Price per seat",
              formatKobo(checkout.quote.unitAmountKobo, checkout.currency),
            ],
            ["Term", "24 months (2 years)"],
          ]}
          total={formatKobo(checkout.amountKobo, checkout.currency)}
        />
        <p className="text-xs text-grey-500">
          Seats appear once the payment is confirmed. If you close the page
          before paying, nothing is bought.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setStep("pick")}>
            Back
          </Button>
          <Button onClick={pay}>Pay with Paystack</Button>
        </div>
      </div>
    );
  }

  if (step === "invoice" && invoice) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-green-600" />
          <div>
            <h3 className="text-base font-semibold">Invoice requested</h3>
            <p className="text-sm text-grey-500">
              Invoice <b>{invoice.invoiceNumber}</b> is awaiting payment.
            </p>
          </div>
        </div>
        <Summary
          rows={[
            ["Invoice number", invoice.invoiceNumber],
            ["Seats", String(invoice.quote.quantity)],
            [
              "Price per seat",
              formatKobo(invoice.quote.unitAmountKobo, invoice.currency),
            ],
            ["Term", "24 months (2 years)"],
          ]}
          total={formatKobo(invoice.amountKobo, invoice.currency)}
        />
        <p className="text-xs text-grey-500">
          Quote the invoice number when you pay. Your seats are created as soon
          as our team confirms the payment, and this page will show them the
          next time you open it. The invoice does not expire on its own.
        </p>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              // back to the calculator; the paywall lists the open invoice
              setInvoice(null);
              setStep("pick");
              onInvoiceDone?.();
            }}
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <SeatCalculator
        quantity={quantity}
        onQuantityChange={setQuantity}
        quote={quote}
        stale={isStale}
        limits={limits}
      />
      {isError ? (
        <p className="text-xs text-red-600">
          We couldn’t price that order. Check the number of seats and try again.
        </p>
      ) : null}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button
          variant="outline"
          disabled={!valid || !!pending}
          loading={pending === "invoice"}
          onClick={() => start("invoice")}
        >
          Request an invoice
        </Button>
        <Button
          disabled={!valid || !!pending}
          loading={pending === "online"}
          onClick={() => start("online")}
        >
          Get {Number.isInteger(quantity) ? quantity : ""} seats
        </Button>
      </div>
      {footer}
    </div>
  );
}

const Summary = ({
  rows,
  total,
}: {
  rows: [string, string][];
  total: string;
}) => (
  <dl className="space-y-2 rounded-lg border p-4 text-sm">
    {rows.map(([label, value]) => (
      <div key={label} className="flex items-center justify-between">
        <dt className="text-grey-500">{label}</dt>
        <dd className="font-medium">{value}</dd>
      </div>
    ))}
    <div className="flex items-center justify-between border-t pt-2">
      <dt className="text-grey-500">Total</dt>
      <dd className="font-bold">{total}</dd>
    </div>
  </dl>
);

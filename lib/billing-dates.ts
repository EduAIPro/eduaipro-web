import { addMonths, differenceInCalendarDays, format } from "date-fns";

export const daysUntil = (iso: string | null | undefined, now = new Date()) =>
  iso ? differenceInCalendarDays(new Date(iso), now) : null;

/** Whole months from now to `iso`, never negative. */
export const monthsUntil = (iso: string, now = new Date()) => {
  const end = new Date(iso);
  let months = 0;
  while (addMonths(now, months + 1) <= end) months += 1;
  return months;
};

/** Where a payment made today would take a plan that ends at `endsAt`. */
export const extendedEnd = (endsAt: string | null, termMonths = 24) =>
  addMonths(
    endsAt && new Date(endsAt) > new Date() ? new Date(endsAt) : new Date(),
    termMonths,
  );

/** Unpaid checkouts are marked FAILED after 24 hours. */
export const isFreshPending = (createdAt: string) =>
  Date.now() - new Date(createdAt).getTime() < 24 * 3_600_000;

export const CHANNEL_LABEL: Record<string, string> = {
  CARD: "Card",
  BANK_TRANSFER: "Bank transfer",
  INVOICE: "Invoice",
};

export const channelLabel = (channel: string | null | undefined) =>
  channel ? (CHANNEL_LABEL[channel] ?? channel) : "Unknown";

/** Never show failureReason verbatim: it carries internal wording. */
export const failureCopy = (
  reason: string | null | undefined,
  reference: string,
) =>
  /abandoned/i.test(reason ?? "")
    ? "Payment not completed"
    : `We couldn’t apply this payment. Contact support with reference ${reference}.`;

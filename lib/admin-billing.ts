import { AdminBillingPlan } from "@/types/admin/billing";

export const MIN_PRICE_KOBO = 100;
export const MAX_PRICE_KOBO = 500_000_000;
// A change of more than this factor, either way, needs confirm: true.
export const CONFIRM_FACTOR = 3;

export const planIdOf = (plan: AdminBillingPlan) => plan.id ?? plan.code;

export const nairaToKobo = (naira: string) =>
  Math.round(Number(naira) * 100);

export const isPriceInRange = (kobo: number) =>
  Number.isFinite(kobo) && kobo >= MIN_PRICE_KOBO && kobo <= MAX_PRICE_KOBO;

export const isLargeChange = (fromKobo: number, toKobo: number) =>
  toKobo > fromKobo * CONFIRM_FACTOR || toKobo * CONFIRM_FACTOR < fromKobo;

export const percentChange = (fromKobo: number, toKobo: number) =>
  fromKobo > 0 ? Math.round(((toKobo - fromKobo) / fromKobo) * 100) : 0;

/** Value for <input type="datetime-local"> min: now, to the minute. */
export const localDateTimeMin = () => {
  const d = new Date(Date.now() + 60_000);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

export const KIND_LABEL: Record<string, string> = {
  SEAT_PURCHASE: "Seat purchase",
  PERSONAL_PLAN: "Personal plan",
};

export const kindLabel = (kind: string) =>
  KIND_LABEL[kind] ?? kind.toLowerCase().replaceAll("_", " ");

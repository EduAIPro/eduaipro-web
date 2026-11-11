import { AdminBillingPlan } from "@/types/admin/billing";
import { SeatBand } from "@/types/billing";

export const MIN_PRICE_KOBO = 100;
export const MAX_PRICE_KOBO = 500_000_000;
// A change of more than this factor, either way, needs confirm: true.
export const CONFIRM_FACTOR = 3;

export const planIdOf = (plan: AdminBillingPlan) => plan.id ?? plan.code;

export const isBandedPlan = (plan: AdminBillingPlan) =>
  plan.code === "SCHOOL_PRO";

/** “5–24 seats” / “300+ seats” */
export const bandLabel = (b: Pick<SeatBand, "minQuantity" | "maxQuantity">) =>
  b.maxQuantity === null
    ? `${b.minQuantity}+ seats`
    : `${b.minQuantity}–${b.maxQuantity} seats`;

export type BandRow = { min: string; max: string; rate: string };

export const bandsToRows = (bands: SeatBand[] | undefined): BandRow[] =>
  (bands ?? []).map((b) => ({
    min: String(b.minQuantity),
    max: b.maxQuantity === null ? "" : String(b.maxQuantity),
    rate: String(b.unitAmountKobo / 100),
  }));

/**
 * Band rows to the API shape. Each band’s minimum is the previous band’s
 * maximum plus one, so gaps and overlaps can’t be typed in.
 */
export const rowsToBands = (rows: BandRow[]): SeatBand[] =>
  rows.map((r, i) => ({
    minQuantity:
      i === 0 ? Number(r.min) : Number(rows[i - 1].max) + 1,
    maxQuantity: r.max === "" ? null : Number(r.max),
    unitAmountKobo: nairaToKobo(r.rate),
  }));

/** First problem with a set of bands, or null when they are valid. */
export const bandsError = (rows: BandRow[]): string | null => {
  if (!rows.length) return "Add at least one band.";
  const bands = rowsToBands(rows);
  for (let i = 0; i < bands.length; i++) {
    const b = bands[i];
    if (!Number.isInteger(b.minQuantity) || b.minQuantity < 1)
      return `Band ${i + 1}: the minimum must be a whole number of seats.`;
    if (b.maxQuantity === null || !Number.isInteger(b.maxQuantity))
      return i === bands.length - 1
        ? "The last band needs a maximum; larger orders are Custom."
        : `Band ${i + 1}: enter a maximum.`;
    if (b.maxQuantity < b.minQuantity)
      return `Band ${i + 1}: the maximum can’t be below the minimum.`;
    if (!isPriceInRange(b.unitAmountKobo))
      return `Band ${i + 1}: enter a rate from ₦${MIN_PRICE_KOBO / 100} to ₦${(MAX_PRICE_KOBO / 100).toLocaleString("en-NG")}.`;
  }
  return null;
};

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
  SEAT_RENEWAL: "Seat renewal",
  PERSONAL_PLAN: "Personal plan",
};

export const kindLabel = (kind: string) =>
  KIND_LABEL[kind] ?? kind.toLowerCase().replaceAll("_", " ");

export const isAdminGrant = (reference: string) =>
  reference.startsWith("eduai_grant_");

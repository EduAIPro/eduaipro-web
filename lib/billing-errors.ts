/**
 * 402 codes the backend sends for pricing v3. Guard errors carry no
 * `statusCode` in the body, so the status always comes from the HTTP response.
 */
export const BILLING_ERROR_EVENT = "eduaipro:billing-error";

export type BillingErrorCode =
  | "PATHWAY_EXPIRED"
  | "PATHWAY_LOCKED"
  | "DEMO_UNIT_LOCKED"
  | "DEMO_INVITE_LIMIT"
  | "SCHOOL_PAYMENT_REQUIRED"
  | "SCHOOL_READ_ONLY";

const GLOBAL_CODES: BillingErrorCode[] = [
  "PATHWAY_EXPIRED",
  "PATHWAY_LOCKED",
  "DEMO_UNIT_LOCKED",
  "DEMO_INVITE_LIMIT",
  "SCHOOL_PAYMENT_REQUIRED",
  "SCHOOL_READ_ONLY",
];

export type BillingErrorDetail = {
  code: BillingErrorCode;
  message: string;
};

export const isBillingErrorCode = (c: unknown): c is BillingErrorCode =>
  typeof c === "string" && GLOBAL_CODES.includes(c as BillingErrorCode);

export const emitBillingError = (detail: BillingErrorDetail) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(BILLING_ERROR_EVENT, { detail }));
};

/** Validation errors arrive as an array of strings. */
export const messageText = (m: unknown, fallback = "Something went wrong") =>
  Array.isArray(m) ? m.join(", ") : typeof m === "string" && m ? m : fallback;

import { BillingPlan } from "../billing";

export type AdminPlanPrice = {
  id: string;
  amountKobo: number;
  currency?: string;
  effectiveAt: string;
  createdAt?: string;
};

// `id` is what the price endpoints take as :planId. The sample response only
// shows `code`, so code is the fallback (see planIdOf).
export type AdminBillingPlan = Omit<BillingPlan, "since" | "upcoming"> & {
  id?: string;
  since: string;
  upcoming: AdminPlanPrice[];
};

export type SetPlanPricePayload = {
  amountKobo: number;
  effectiveAt?: string;
  confirm?: boolean;
};

export type SetPlanPriceResponse = {
  price: AdminPlanPrice;
  affectedSubscribers: number;
};

export type AdminTransactionKind = "SEAT_PURCHASE" | "PERSONAL_PLAN" | string;
export type AdminTransactionStatus = "SUCCESS" | "PENDING" | "FAILED" | string;

export type AdminTransaction = {
  id: string;
  reference: string;
  kind: AdminTransactionKind;
  status: AdminTransactionStatus;
  amountKobo: number;
  currency: string;
  failureReason: string | null;
  paidAt: string | null;
  createdAt: string;
  userId: string | null;
  schoolId: string | null;
  seatPurchaseId: string | null;
};

export type AdminTransactionsData = {
  items: AdminTransaction[];
  total: number;
  page: number;
  limit: number;
};

export type AdminBillingError = {
  status: number | undefined;
  message: string;
  /** 400 telling us the change is more than 3x and needs confirm: true */
  needsConfirm: boolean;
};

export const isAdminBillingError = (e: unknown): e is AdminBillingError =>
  typeof e === "object" && e !== null && "needsConfirm" in e && "message" in e;

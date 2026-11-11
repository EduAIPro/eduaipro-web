import { BillingPlan, SeatBand, Transaction, UpcomingPrice } from "../billing";

export type AdminPlanPrice = UpcomingPrice;

// `id` is what the price endpoints take as :planId.
export type AdminBillingPlan = BillingPlan;

export type SetPlanPricePayload = {
  /** Personal Pro. Ignored for School Pro, which sends `bands`. */
  amountKobo?: number;
  bands?: SeatBand[];
  effectiveAt?: string;
  confirm?: boolean;
};

export type SetPlanPriceResponse = {
  price: AdminPlanPrice;
};

export type AdminTransactionKind = Transaction["kind"];
export type AdminTransactionStatus = Transaction["status"];
export type AdminTransaction = Transaction;

export type AdminTransactionsData = {
  items: AdminTransaction[];
  total: number;
  page: number;
  limit: number;
};

export type AdminInvoice = {
  id: string;
  invoiceNumber: string;
  requestedAt: string;
  quantity: number;
  unitPriceKobo: number;
  totalKobo: number;
  school: { id: string; institutionName: string };
};

export type AdminDemo = {
  id: string;
  status: "ACTIVE" | "EXPIRED" | "CONVERTED";
  startedAt: string;
  endsAt: string;
  maxInvites: number;
  maxUnitIndex: number;
  school: { id: string; institutionName: string; contactEmail: string };
};

export type AdminBillingError = {
  status: number | undefined;
  message: string;
  /** 400 telling us the change is more than 3x and needs confirm: true */
  needsConfirm: boolean;
};

export const isAdminBillingError = (e: unknown): e is AdminBillingError =>
  typeof e === "object" && e !== null && "needsConfirm" in e && "message" in e;

export type GrantSeatsPayload = {
  quantity: number;
  amountKobo?: number;
  termMonths?: number;
  paymentReference?: string;
  note?: string;
};

export type GrantSeatsResponse = {
  seatPurchaseId: string;
  reference: string;
  quantity: number;
  amountKobo: number;
  currency: "NGN";
  status: "ACTIVE";
  endsAt: string;
};

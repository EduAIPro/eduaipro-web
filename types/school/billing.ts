import { Pagination } from ".";
import type {
  PaymentChannel,
  SeatQuote,
  Transaction,
  TransactionsData,
} from "../billing";

export type SeatState = "AVAILABLE" | "ASSIGNED" | "CONSUMED";
export type PurchaseStatus = "PENDING" | "ACTIVE" | "EXPIRED";

export type Seat = {
  id: string;
  state: SeatState;
  staffId: string | null;
  staff: {
    id: string;
    user: { firstName: string; lastName: string; email: string };
  } | null;
  assignedAt: string | null;
  consumedAt: string | null;
  termStartsAt: string;
  termEndsAt: string;
  seatPurchaseId: string;
};

export type SeatPurchase = {
  id: string;
  quantity: number;
  termMonths: number;
  status: PurchaseStatus;
  unitPriceKobo: number | null;
  activatedAt: string | null;
  /** when the seats stop working */
  endsAt: string | null;
  invoiceNumber: string | null;
  invoiceRequestedAt: string | null;
  createdAt: string;
};

export type SchoolSeatsData = {
  purchased: number;
  assigned: number;
  consumed: number;
  available: number;
  term: { startsAt: string; endsAt: string } | null;
  seats: Seat[];
  purchases: SeatPurchase[];
};

export type BuySeatsPayload = {
  quantity: number;
  invoice?: boolean;
  callbackUrl?: string;
};

/** Online checkout and renewals. */
export type CheckoutResponse = {
  authorizationUrl: string;
  reference: string;
  seatPurchaseId: string;
  amountKobo: number;
  currency: string;
  quote: SeatQuote;
};

export type InvoiceResponse = {
  invoiceNumber: string;
  reference: string;
  seatPurchaseId: string;
  amountKobo: number;
  currency: string;
  quote: SeatQuote;
};

export type BuySeatsResponse = CheckoutResponse | InvoiceResponse;

export const isInvoiceResponse = (r: BuySeatsResponse): r is InvoiceResponse =>
  "invoiceNumber" in r;

export type RenewSeatsPayload = { purchaseId: string; callbackUrl?: string };

export type AssignSeatPayload = { staffId: string };
export type AssignSeatResponse = {
  seat: Seat;
  certificatesQueued: number;
};

export type SchoolTransactionStatus = Transaction["status"];
export type SchoolTransaction = Transaction;
export type SchoolTransactionsData = TransactionsData;

export type StoredCheckout = {
  reference: string;
  seatPurchaseId?: string;
};

export type SchoolAccessState =
  | "PERSONAL"
  | "PAID"
  | "DEMO"
  | "READ_ONLY"
  | "UNPAID";

export type DemoStatusValue = "ACTIVE" | "EXPIRED" | "CONVERTED";

export type SchoolAccess = {
  state: SchoolAccessState;
  canView: boolean;
  canWrite: boolean;
  liveSeats: number;
  demo: null | {
    status: DemoStatusValue;
    endsAt: string;
    maxInvites: number;
    maxUnitIndex: number;
  };
};

export type DemoStatus = {
  status: DemoStatusValue;
  startedAt: string;
  endsAt: string;
  maxInvites: number;
  maxUnitIndex: number;
  /** teachers already in + invites still pending */
  invitesUsed: number;
  invitesRemaining: number;
};

export type { Pagination, PaymentChannel };

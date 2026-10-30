import { Pagination } from ".";

export type SeatTier = "BASIC" | "PRO";
export type SeatState = "AVAILABLE" | "ASSIGNED" | "CONSUMED";
export type PurchaseStatus = "PENDING" | "ACTIVE";

export type Seat = {
  id: string;
  tier: SeatTier;
  courseId: string | null;
  termEndsAt: string;
  staff: { name: string; email: string } | null;
  state: SeatState;
};

export type SeatPurchase = {
  id: string;
  tier: SeatTier;
  quantity: number;
  unitPriceKobo: number;
  status: PurchaseStatus;
  renewsAt: string | null;
  autoRenew: boolean;
  card: { last4: string; brand: string; bank: string } | null;
  graceEndsAt: string | null;
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
  tier: SeatTier;
  quantity: number;
  termMonths?: number;
  callbackUrl?: string;
};

export type BuySeatsResponse = {
  authorizationUrl: string;
  reference: string;
  seatPurchaseId: string;
  amountKobo: number;
  currency: string;
};

export type CancelSeatPurchaseResponse = {
  autoRenew: boolean;
  accessUntil: string;
};

export type AssignSeatPayload = { staffId: string; courseId?: string };
export type AssignSeatResponse = {
  seat: Seat;
  certificatesQueued: number;
};

export type SchoolTransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | string;

export type SchoolTransaction = {
  id: string;
  reference: string;
  kind: string;
  status: SchoolTransactionStatus;
  amountKobo: number;
  currency: string;
  failureReason: string | null;
  paidAt: string | null;
  createdAt: string;
  userId: string | null;
  schoolId: string | null;
  seatPurchaseId: string | null;
};

export type SchoolTransactionsData = {
  items: SchoolTransaction[];
  total: number;
  page: number;
  limit: number;
};

export type StoredCheckout = {
  reference: string;
  seatPurchaseId: string;
};

export type { Pagination };

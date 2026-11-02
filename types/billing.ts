export type Kobo = number;

export type PlanCode = "PERSONAL_PRO" | "SCHOOL_PRO";

export type SeatBand = {
  minQuantity: number;
  maxQuantity: number | null;
  unitAmountKobo: Kobo;
};

export type PlanPrice = {
  amountKobo: Kobo;
  currency: string;
  /** SCHOOL_PRO only */
  bands?: SeatBand[];
};

export type UpcomingPrice = {
  id: string;
  amountKobo: Kobo;
  bands?: SeatBand[];
  currency?: string;
  effectiveAt: string;
  createdAt?: string;
};

export type BillingPlan = {
  id?: string;
  code: PlanCode;
  name: string;
  currency: string;
  isActive: boolean;
  details: {
    description: string;
    payer: "SCHOOL" | "TEACHER";
    termMonths: number;
    pathways: "ALL";
    maxEnrollments: number;
    includes: string[];
  } | null;
  /** null until an admin (or the migration) sets a price */
  current: PlanPrice | null;
  since: string | null;
  upcoming: UpcomingPrice[];
};

export type SeatQuote = {
  quantity: number;
  currency: string;
  unitAmountKobo: Kobo;
  totalKobo: Kobo;
  band: { minQuantity: number; maxQuantity: number | null };
  /** what the same order costs at the first band's rate */
  listTotalKobo: Kobo;
  savingKobo: Kobo;
  limits: { min: number; max: number };
  nudge: null | {
    addSeats: number;
    quantity: number;
    unitAmountKobo: Kobo;
    totalKobo: Kobo;
    savesKobo: Kobo;
  };
};

export type SubscriptionSource = "PERSONAL" | "SCHOOL";

/** GET billing/subscription, and `entitlement` inside me/pathways and me/enrollments */
export type Subscription = {
  plan: "FREE" | "PRO";
  sources: SubscriptionSource[];
  /** when the plan ends, and when a new certificate would expire. null on Free */
  endsAt: string | null;
  canAccessContent: boolean;
  canIssueCertificate: boolean;
  canAddPathway: boolean;
  maxEnrollments: number;
  /** demo teachers: highest unit open. null otherwise */
  unitCap: number | null;
  /** false only if monetisation is switched off platform-wide */
  enforced: boolean;
};

export type SubscribePayload = { courseId?: string; callbackUrl?: string };

export type SubscribeResponse = {
  authorizationUrl: string;
  reference: string;
};

export type PaymentChannel = "CARD" | "BANK_TRANSFER" | "INVOICE";
export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
export type TransactionKind =
  | "PERSONAL_PLAN"
  | "SEAT_PURCHASE"
  | "SEAT_RENEWAL";

export type Transaction = {
  id: string;
  reference: string;
  kind: TransactionKind | string;
  status: TransactionStatus | string;
  amountKobo: Kobo;
  currency: string;
  channel: PaymentChannel | null;
  failureReason: string | null;
  paidAt: string | null;
  createdAt: string;
  userId: string | null;
  schoolId: string | null;
  seatPurchaseId: string | null;
};

export type TransactionsData = {
  items: Transaction[];
  total: number;
  page: number;
  limit: number;
};

/** Provided by the school with no personal plan of their own. */
export const isSchoolProvided = (s: Subscription | null) =>
  !!s?.sources.includes("SCHOOL") && !s.sources.includes("PERSONAL");

/** Teachers in a demo school: Unit 1 only. */
export const isDemoTeacher = (s: Subscription | null) =>
  s?.unitCap !== null && s?.unitCap !== undefined;

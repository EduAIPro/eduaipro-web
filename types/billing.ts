import { AdminPlanPrice } from "./admin/billing";

export type BillingPlan = {
  code: "SCHOOL_PRO" | "SCHOOL_BASIC" | "PERSONAL_PRO";
  name: string;
  currency: string;
  isActive: boolean;
  details: {
    description: string;
    payer: "SCHOOL" | "TEACHER";
    termMonths: number;
    pathways: "ALL" | "ONE";
    maxEnrollments: number;
    includes: string[];
  };
  current: {
    amountKobo: number;
    currency: string;
    source: number;
  };
  since: number;
  upcoming: AdminPlanPrice[];
};
export type SubscriptionSource = "PERSONAL" | `SCHOOL:${string}`;

export type Subscription = {
  plan: "FREE" | "PRO" | string;
  status: "ACTIVE" | "PAST_DUE" | null;
  sources: SubscriptionSource[];
  renewsAt: string;
  graceEndsAt: null | string;
  autoRenew: boolean;
  card: {
    last4: string;
    brand: string;
    bank: string;
  };
  canAccessContent: boolean;
  canIssueCertificate: boolean;
  canAddPathway: boolean;
  maxEnrollments: number;
  enforced: boolean;
  coveredCourseIds: null | string[];
  promptCancelPersonal: boolean;
};

export type SubscribePayload = { courseId?: string; callbackUrl?: string };

export type SubscribeResponse = {
  authorizationUrl: string;
  reference: string;
};

export type CancelSubscriptionResponse = {
  autoRenew: boolean;
  accessUntil: string;
};
export type ResumeSubscriptionResponse = Subscription;

export const isSchoolSeat = (subscription: Subscription | null) =>
  !!subscription?.sources.some((s) => s.startsWith("SCHOOL"));

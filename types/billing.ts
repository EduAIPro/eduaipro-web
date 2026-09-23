export type SubscriptionSource = "PERSONAL" | `SCHOOL:${string}`;

export type Subscription = {
  plan: "FREE" | "PRO" | string;
  status: "active" | "canceled" | "past_due" | "trialing" | string;
  sources: SubscriptionSource[];
  renewsAt: string | null;
  cancelAtPeriodEnd: boolean;
  canAccessContent: boolean;
  canIssueCertificate: boolean;
  canAddPathway: boolean;
  maxEnrollments: number;
  enforced: boolean;
  billing: {
    amount: number;
    currency: string;
    interval: "month" | "year" | string;
    paymentMethod: { brand: string; last4: string } | null;
  } | null;
};

export type SubscribePayload = { courseId?: string };

export type SubscribeResponse = {
  authorizationUrl: string;
  reference: string;
};

export type CancelSubscriptionResponse = Subscription;
export type ResumeSubscriptionResponse = Subscription;

export const isSchoolSeat = (subscription: Subscription | null) =>
  !!subscription?.sources.some((s) => s.startsWith("SCHOOL:"));

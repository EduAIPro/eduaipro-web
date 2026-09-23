export type Subscription = {
  plan: string;
  sources: string[];
  renewsAt: string | null;
  canAccessContent: boolean;
  canIssueCertificate: boolean;
  canAddPathway: boolean;
  maxEnrollments: number;
  enforced: boolean;
};

export type SubscribePayload = { courseId: string };

export type SubscribeResponse = {
  authorizationUrl: string;
  reference: string;
};
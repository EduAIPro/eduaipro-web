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
  upcoming: number[];
};

import { UserRoles } from "../auth";

export type SchoolInviteToken = {
  id: string;
  token: string;
  schoolId: string;
  role: UserRoles;
  level: null | UserRoles;
  usageLimit: number;
  usedCount: number;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type InviteStaffBulkPayload = {
  staffs: {
    firstName: string;
    lastName: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
    level: UserRoles;
  }[];
};

/** GET /school/invite/pending */
export type PendingInvite = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  /** CPD pathway chosen for the teacher, e.g. SECONDARY */
  level: string;
  courseId: string | null;
  type: "SINGLE" | "BULK" | string;
  expiresAt: string;
  createdAt: string;
};

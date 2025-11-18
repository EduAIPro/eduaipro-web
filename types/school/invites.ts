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

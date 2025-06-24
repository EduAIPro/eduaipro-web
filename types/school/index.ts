import { UserRoles } from "../auth";

export type School = {
  admins: any[];
  _id: string;
  name: string;
  adminName?: string;
  city?: string;
  state?: string;
  type: string;
  location: string;
  contactNumber: string;
  officialEmail: string;
  contactEmail?: string;
  focusAreas?: any[];
  staffCount?: number;
  role: UserRoles.school;
  isActive: boolean;
  website?: string;
  position: string;
  schoolID: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  teachers?: any[];
  activeAdminsCount: number;
  id: string;
};

export type Teacher = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  role: UserRoles.teacher;
  dateOfBirth: string; // ISO date string
  isActive: boolean;
  qualifications: string;
  schoolId: string;
  teachingLevel: "Secondary" | string;
  specialSkills: string[];
  expertiseAreas: string[];
  interestInNetworkingOrCommunityEvents: boolean;
  courses: string[];
  securityQuestions: string[];
  isBlocked: boolean;
  isDeleted: boolean;
  otp: string | null;
  approvalStatus: "APPROVED" | "PENDING" | "REJECTED" | string;
  progress: any[]; // Replace 'any' with a more specific type if known
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  approvedAt: string; // ISO date string
};

import { Accreditation } from "../certificates";

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

export type Country = {
  id: string;
  name: string;
  isoCode: string;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  total: number;
  current: number;
  next: null | string;
};

export type CountriesList = {
  pagination: Pagination;
  data: Country[];
};

export type SchoolAnalytics = {
  staffActivity: StaffActivity;
  accreditationStatus: StaffAccreditationStatus;
  courseProgress: StaffCourseProgress;
  renewals: StaffRenewals;
  completionRateHistory: CourseCompletionRate[];
};

export type SchoolOverdueRenewals = {
  pagination: Pagination;
  data: Accreditation[];
};

export type StaffActivity = {
  totalActiveStaffs: number;
  totalInactiveStaffs: number;
};
export type StaffAccreditationStatus = {
  totalAccreditedStaffs: number;
  totalNonAccreditedStaffs: number;
};
export type StaffCourseProgress = {
  totalPending: number;
  totalInProgress: number;
  totalCompleted: number;
};
export type StaffRenewals = {
  overdueRenewals: number;
  upcomingRenewals: number;
};

export type CourseCompletionRate = {
  rate: number;
  createdAt: string;
  month: string;
  year: number;
};

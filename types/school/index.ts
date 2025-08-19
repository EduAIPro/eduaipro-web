import { Accreditation } from "../certificates";

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

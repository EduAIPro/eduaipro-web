import { Pagination } from ".";
import { AdminSchool } from "../admin";
import { UserRoles } from "../auth";
import { Accreditation } from "../certificates";
import { Enrollment } from "../enrollment";

export type Teacher = {
  name: string;
  email: string;
  phone: string;
  level: string;
  status: string;
  createdAt: string;
};

export type StaffPlan = "FREE" | "PRO" | "SCHOOL_SEAT" | string;

export type SchoolStaff = {
  id: string;
  role: UserRoles;
  isActive: boolean;
  teacherLevel: string;
  positionDescription: UserRoles;
  createdAt: string;
  updatedAt: string;
  professionalLevel: null | string;
  educationalLevel: null | string;
  experienceRange: null | string;
  areaOfSpecialization: null | string;
  interestedSkills: string[];
  primaryLearningGoal: null | string;
  altLearningGoal: null | string;
  acceptedTermsAndConditions: boolean;
  userId: string;
  schoolId: string;
  // Multi-pathway fields. The roster endpoint is expected to return these
  // nested (one call, no N+1); until it does they are undefined.
  enrollments?: Enrollment[];
  plan?: StaffPlan;
  seat?: { id: string; tier: "BASIC" | "PRO"; state: string } | null;
  school: {
    institutionName: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerifiedAt: null | string;
    phoneNumber: string;
    phoneCountryCode: string;
    createdAt: string;
  };
};

export type SchoolStaffsData = {
  pagination: Pagination;
  data: Omit<SchoolStaff, "school">[];
};

export type StaffDetail = Omit<SchoolStaff, "school"> & {
  accreditationHistory: Accreditation[];
  accreditationProgressPercentage: number;
  user: {
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    lastLoggedInAt: string;
    emailVerifiedAt: string;
    email: string;
    phoneNumber: string;
    phoneCountryCode: string;
    profileImageUrl: null | string;
  };
  school?: AdminSchool;
};

import { Country } from "../school";
import { Staff } from "../user";

export type AdminSchool = {
  id: string;
  institutionName: string;
  state: string;
  city: string;
  isActive: boolean;
  isSingle: boolean;
  streetAddress: string;
  contactEmail: string;
  contactPhoneNumber: string;
  contactPhoneCountryCode: string;
  createdAt: string;
  updatedAt: string;
  countryId: string;
  _count: {
    staffMembers: number;
  };
  owner: Staff | null;
};

export type SchoolOwner = {
  firstName: string;
  lastName: string;
  email: string;
};

export type TotalTeachersAggregate = {
  activeTeachersCount: number;
  inactiveTeachersCount: number;
};

export type TotalAdminsAggregate = {
  activeAdminsCount: number;
  inactiveAdminsCount: number;
};

export type TotalEnrolledAggregate = {
  totalEnrolledCount: number;
  totalNotEnrolledCount: number;
};

export type TotalAccreditedAggregate = {
  totalAccreditedTeacherCount: number;
  totalNotAccreditedTeachersCount: number;
};

export type CourseCompletionRateAggregate = {
  averageCompletionRate: number;
  totalSchools: number;
  schoolsWithData: number;
};

export type GetAdminAggregates = {
  totalSchools: number;
  totalTeachers: TotalTeachersAggregate;
  totalAdmins: TotalAdminsAggregate;
  totalEnrolled: TotalEnrolledAggregate;
  totalAccreditedTeachers: TotalAccreditedAggregate;
  courseCompletionRate: CourseCompletionRateAggregate;
};

export type GetTopTeachers = {
  firstName: string;
  lastName: string;
  institutionName: string;
}[];

export type GetTopSchools = (AdminSchool & {
  engagementScore: number;
})[];

export type GetCountryDistribution = {
  country: Country;
  schoolCount: number;
  percentage: number;
}[];

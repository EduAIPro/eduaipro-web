import { AdminSchool } from ".";
import { Pagination } from "../school";

export type UpdateSchoolStatus = {
  active: boolean;
};

export type SchoolList = AdminSchool & {
  totalTeacherCount: number;
  totalAccreditedTeacherCount: number;
};

export type SchoolslistResponse = {
  pagination: Pagination;
  data: SchoolList[];
};

export type RetrieveSchoolDetails = AdminSchool & {
  aggregates: {
    totalTeacherCount: number;
    totalActiveTeachers: number;
    totalAccreditedTeacherCount: number;
  };
};

export type SchoolCertificate = {
  schoolId: string;
  schoolName: string;
  courseId: string;
  courseTitle: string;
  courseLevel: string;
  enrolledTeachers: number;
  completedTeachers: number;
  metrics: {
    totalAccreditedTeachers: number;
    totalTeachers: number;
    totalPendingRenewals: number;
    totalExpiredCertificates: number;
  };
};

export type ListSchoolCertificates = {
  pagination: Pagination;
  data: SchoolCertificate[];
};

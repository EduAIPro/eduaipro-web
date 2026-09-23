import { TeacherLevelType } from "./course";

export type Entitlement = {
  canAddPathway: boolean;
  maxEnrollments: number;
  enrolledCount?: number;
};

export type Pathway = {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: TeacherLevelType;
  imageUrl: string | null;
  cpdHours: number;
  unitCount: number;
  isActive: boolean;
  enrolled: boolean;
  completed: boolean;
  progress: number;
  entitled: boolean;
};

export type GetPathwaysResponse = {
  entitlement: Entitlement;
  pathways: Pathway[];
};

export type EnrollmentStatus = "in_progress" | "completed" | string;

export type EnrollmentCourseSummary = {
  id: string;
  title: string;
  slug: string;
  level: TeacherLevelType;
  imageUrl: string | null;
  cpdHours: number;
};

export type EnrollmentCertificateSummary = {
  id: string;
  certificateId: string;
  issuedAt: string;
  certificateImageUrl: string;
};

export type Enrollment = {
  id: string;
  course: EnrollmentCourseSummary;
  source: string;
  status: EnrollmentStatus;
  progress: number;
  currentUnit: { id: string; index: number; title: string } | null;
  startedAt: string;
  completedAt: string | null;
  isActive: boolean;
  certificate: EnrollmentCertificateSummary | null;
};

export type GetEnrollmentsResponse = {
  entitlement: Entitlement;
  activeCourseId: string | null;
  enrollments: Enrollment[];
};

export type EnrollPayload = { courseId: string };

export type SetActiveCoursePayload = { courseId: string };
export type SetActiveCourseResponse = { activeCourseId: string };

export type SubscriptionRequiredError = {
  statusCode: 402;
  message: string;
  error: "SubscriptionRequired";
  code: "SUBSCRIPTION_REQUIRED";
};

export const isSubscriptionRequiredError = (
  error: unknown,
): error is SubscriptionRequiredError =>
  !!error &&
  typeof error === "object" &&
  (error as SubscriptionRequiredError).code === "SUBSCRIPTION_REQUIRED";
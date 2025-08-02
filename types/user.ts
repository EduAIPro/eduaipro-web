import { UserRoles } from "./auth";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  phoneNumber: string;
  profileImageUrl: null | string;
  lastLoggedInAt: string;
};

export type Staff = {
  id: string;
  role: UserRoles;
  isActive: boolean;
  teacherLevel: null | string;
  positionDescription: UserRoles;
  createdAt: string;
  updatedAt: string;
  educationalLevel: null | string;
  experienceRange: null | string;
  areaOfSpecialization: null | string;
  interestedSkills: string[];
  primaryLearningGoal: null | string;
  altLearningGoal: null | string;
  acceptedTermsAndConditions: boolean;
  userId: string;
  schoolId: null | string;
  user: User;
};

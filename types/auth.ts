export type CreateTeacherAccountPayload = {
  teachingLevel: string;
  subjectsTaught: string[];
  specialSkills: string[];
  mentorDomain: string;
  expertiseAreas: string[];
  learningGoals: {
    careerAdvancement: boolean;
    skillDevelopment: boolean;
    subjectSpecificKnowledge: boolean;
  };
  interestInNetworkingOrCommunityEvents: boolean;
  privacySettings: {
    profileVisibility: "public" | "private";
    dataSharing: string;
  };
  securityQuestions: string[];
  qualifications: string;
  dateOfBirth: string;
  role: "Teacher" | "Mentor" | "Teaching Assistant";
};

export type TeacherSignup = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type UserRoles = "USER" | "OWNER" | "ADMIN";

export type APIBaseResponse = {
  statusCode: number;
  message: string;
};

export type TeacherLoginResponse = APIBaseResponse & {
  data: {
    tokens: {
      access: string;
      refresh: string;
    };
    user: {
      id: string;
      name: string;
      emailVerifiedAt: string;
      role: UserRoles;
    };
    staff: {
      id: string;
      role: UserRoles;
      isActive: boolean;
      teacherLevel: null | string;
      positionDescription: string;
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
      school: {
        institutionName: string;
      };
    };
  };
};

export type TeacherSignupResponse = {
  statusCode: number;
  message: string;
  data: {
    tokens: {
      access: string;
      refresh: string;
    };
    user: {
      id: string;
      name: string;
      emailVerifiedAt: boolean;
    };
  };
};

export type TeacherSurveyPayload = {
  personal: {
    dateOfBirth: string;
    schoolName: string;
    location: string;
    phoneNumber?: string;
  };
  professional: {
    teacherLevel: string;
    educationalLevel: string;
    experienceRange: string;
    areaOfSpecialization: string;
    interestedSkills: string[];
    primaryLearningGoal: string;
    altLearningGoal: string;
    acceptedTermsAndConditions: boolean;
  };
};

export type ConfirmPasswordReset = {
  email: string;
  password: string;
  token: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
};

export type RefreshTokenResponse = APIBaseResponse & {
  data: {
    tokens: {
      access: string;
      refresh: string;
    };
  };
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  profileImageUrl: null | string;
  dateOfBirth: null | string;
  location: null | string;
  emailVerifiedAt: null | string;
  isActive: boolean;
  lastLoggedInAt: string;
  createdAt: string;
  updatedAt: string;
  role: UserRoles;
};

export type SchoolSignupPayload = {
  name: string;
  city: string;
  state: string;
  adminName: string;
  type: string;
  password: string;
  location: string;
  contactNumber: string;
  officialEmail: string;
  contactEmail: string;
  phoneNumber: string;
  position: string;
};

export enum UserRoles {
  teacher = "Teacher",
  school = "SCHOOL",
}
export type SchoolSignupResponse = {
  statusCode: number;
  error: null | string;
  message: string;
  data: {
    school: {
      name: string;
      type: string;
      location: string;
      contactNumber: string;
      officialEmail: string;
      role: UserRoles;
      isActive: boolean;
      contactEmail: string;
      phoneNumber: string;
      position: string;
      website?: string;
      schoolID: string;
      admins: any[];
      _id: string;
      lastLogin: string;
      createdAt: string;
      updatedAt: string;
      activeAdminsCount: number;
      id: string;
    };
    tokens: {
      token: string;
      refreshToken: string;
    };
  };
};

export type SchoolLogin = {
  officialEmail: string;
  password: string;
};

export type SchoolLoginResponse = {
  statusCode: number;
  message: string;
  data: {
    school: {
      id: string;
      name: string;
      email: string;
      type: string;
    };
    tokens: {
      token: string;
      refreshToken: string;
    };
  };
  error: null | string;
};

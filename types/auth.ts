export type CreateEducatorAccountPayload = {
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

export type EducatorSignup = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
};

export type Login = {
  email: string;
  password: string;
};

export type EducatorLoginResponse = {
  statusCode: number;
  message: string;
  data: {
    userId: string;
    role: null | string;
    tokens: {
      token: string;
      refreshToken: string;
    };
  };
  error: null | string;
};

export type EducatorSignupResponse = {
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: null | string;
    };
    role: null | string;
    tokens: {
      token: string;
      refreshToken: string;
    };
  };
  error: null | string;
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

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

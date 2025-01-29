export type CreateEducatorAccountPayload = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isMentor: boolean;
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
    profileVisibility: string;
    dataSharing: string;
  };
  securityQuestions: string[];
  qualifications: string;
  dateOfBirth: string;
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

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

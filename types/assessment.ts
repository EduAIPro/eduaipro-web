export type GeneratedQuestions = {
  id: string;
  unitId: string;
  generatedForId: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  metadata: QuestionMetadata;
  AssessmentQuestion: AssessmentQuestion[];
};

export type QuestionMetadata = {
  total_questions: number;
  cognitive_levels: MetadataCognitiveLevels;
  difficulty_distribution: DifficultyDistributionLevels;
};

export type MetadataCognitiveLevels = {
  analysis: number;
  synthesis: number;
  evaluation: number;
  application: number;
  comprehension: number;
  knowledge_recall: number;
};

export type DifficultyDistributionLevels = {
  basic: number;
  advanced: number;
  intermediate: number;
};

export type AssessmentQuestion = {
  index: number;
  questionText: string;
  AssessmentQuestionOption: AssessmentQuestionOption[];
};

export type AssessmentQuestionOption = {
  id: string;
  identifier: string;
  value: string;
  assessmentQuestionId: string;
  createdAt: string;
  updatedAt: string;
};

export type AssessmentSubmitResponse = {
  assessmentPassed: boolean;
  assessmentRecord: {
    id: string;
    unitId: string;
    staffId: string;
    createdAt: string;
    updatedAt: string;
    gradePercentage: number;
  };
};

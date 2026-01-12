import { AdminSchool } from ".";
import { Pagination } from "../school";

export enum SurveyVisibilityEum {
  ONE_SCHOOL_ONLY = "ONE_SCHOOL_ONLY",
  SCHOOL_ONLY = "SCHOOL",
  ADMIN_ONLY = "ADMIN_ONLY",
  ONE_ADMIN_ONLY = "ONE_ADMIN_ONLY",
  ONE_TEACHER_ONLY = "ONE_TEACHER_ONLY",
  TEACHER_ONLY = "TEACHER_ONLY",
}

export enum SurveyStatusEum {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
}

export type SurveyResponse = {
  id: string;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED" | "DECLINED";
  createdAt: string;
};

export type Survey = {
  id: string;
  title: string;
  description: string;
  status: SurveyStatusEum;
  visibility: "SCHOOL" | "ADMIN_ONLY" | "TEACHER_ONLY";
  allowMultipleSubmissions: boolean;
  startsAt: string;
  endsAt: string;
  responses: SurveyResponse[];
  timeLimit: number;
  showProgress: boolean;
  showQuestionNumbers: boolean;
  randomizeQuestions: boolean;
  estimatedDuration: number;
  maxResponses: number;
  thankyouMessage: string;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  schoolId: null | string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  school: null | AdminSchool;
  questions: SurveyQuestion[];
  _count: {
    responses: number;
  };
};

export type UserSurveyList = {
  data: Survey[];
  pagination: Pagination;
};

export enum SurveyQuestionTypeEnum {
  MULTIPLE_CHOICE_SINGLE = "MULTIPLE_CHOICE_SINGLE",
  MULTIPLE_CHOICE_MULTIPLE = "MULTIPLE_CHOICE_MULTIPLE",
  DROPDOWN = "DROPDOWN",
  YES_NO = "YES_NO",
  RATING_SCALE = "RATING_SCALE",
  SHORT_TEXT = "SHORT_TEXT",
  LONG_TEXT = "LONG_TEXT",
  NUMERIC_INPUT = "NUMERIC_INPUT",
  DATE_INPUT = "DATE_INPUT",
  TIME_INPUT = "TIME_INPUT",
  DATETIME_INPUT = "DATETIME_INPUT",
}

export type SurveyQuestion = {
  id: string;
  surveyId: string;
  type: SurveyQuestionTypeEnum;
  title: string;
  description: string;
  placeholder: null | string;
  index: number;
  isRequired: true;
  isActive: true;
  createdAt: string;
  updatedAt: string;
  options: ShurveyQuestionOption[];
};

export type ShurveyQuestionOption = {
  id: string;
  questionId: string;
  value: string;
  label: string;
  description: string;
  index: number;
  isActive: true;
  metadata: {
    year: number;
    category: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type TableSurvey = Omit<Survey, "questions">;

export type GetSurveysList = {
  pagination: Pagination;
  data: TableSurvey[];
};

export type SurveyAnswer = {
  questionId: string;
  textValue?: string;
  numericValue?: number;
  dateValue?: string;
  booleanValue?: boolean;
  jsonValue?: any;
  selectedOptions?: string[];
  optionId?: string;
};

export enum TriggerType {
  UNIT_COMPLETE = "UNIT_COMPLETE",
  MODULE_COMPLETE = "MODULE_COMPLETE",
  PAGE_VISIT = "PAGE_VISIT",
  MANUAL = "MANUAL",
}

export type CreateSurveyPayload = {
  title: string;
  description?: string;
  status: "DRAFT" | "ACTIVE";
  visibility: "SCHOOL" | "ADMIN_ONLY" | "TEACHER_ONLY";
  allowMultipleSubmissions: boolean;
  triggerType?: TriggerType;
  triggerMetadata?: any;
  courseId?: string;
  startsAt: string;
  endsAt: string;
  schoolId?: string;
  thankyouMessage?: string;
  questions: CreateSurveyQueston[];
};

export type CreateSurveyQueston = {
  type: string;
  title: string;
  description?: string;
  index: number;
  isRequired: boolean;
  isActive: boolean;
  options?: CreateSurveyOption[];
};

export type CreateSurveyOption = {
  value: string;
  label: string;
  description?: string;
  index: number;
  isActive: boolean;
};

export type SurveyAggregates = {
  totalSurveys: number;
  totalResponses: number;
  completedResponses: number;
  responseRate: number;
};

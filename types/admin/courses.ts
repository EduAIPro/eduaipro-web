import { ModuleType, TeacherLevelType } from "../course";
import { Pagination } from "../school";

export type GetCoursesList = {
  pagination: Pagination;
  data: TableCourse[];
};

export type TableCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: null | string;
  introductoryVideoUrl: string;
  certificateValidationDays: number;
  validityPeriodDays: number;
  createdAt: string;
  updatedAt: string;
  level: TeacherLevelType;
  isMain: boolean;
  createdById: string;
};

export type CreateCoursePayload = {
  title: string;
  description: string;
  level: TeacherLevelType;
  certificateValidationDays: number;
  introductoryVideoUrl: string;
  units: CreateCourseUnit[];
};

export type CreateCourseUnit = {
  title: string;
  index: number;
  modules: CreateCourseModule[];
};

export type CreateCourseModule = {
  title: string;
  index: number;
  moduleItems: CreateCourseModuleItem[];
};

export type CreateCourseModuleItem = {
  pdfUrl: string;
  type: ModuleType;
  index: number;
  pages: {
    title: string;
    number: number;
  }[];
};

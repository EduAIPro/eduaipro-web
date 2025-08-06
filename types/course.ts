enum TeacherLevel {
  primary = "PRIMARY",
  secondary = "SECONDARY",
  mentor = "MENTOR",
  tertiary = "TERTIARY",
  teacherAssistant = "TEACHER_ASSISTANT",
}

export type TeacherLevelType =
  | "PRIMARY"
  | "SECONDARY"
  | "MENTOR"
  | "TERTIARY"
  | "TEACHER_ASSISTANT";

export type CourseWithProgress = {
  course: Course;
  courseProgress: CourseProgress;
};

export type CourseUnit = {
  id: string;
  title: string;
  index: number;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: null | string;
  introductoryVideoUrl?: string;
  certificateValidationDays: number;
  validityPeriodDays: number;
  createdAt: string;
  updatedAt: string;
  level: TeacherLevelType;
  isMain: boolean;
  createdById: string;
  units: CourseUnit[];
};

export type ActiveStep = {
  id: string;
  index: number;
};

export type CourseProgress = {
  id: string;
  staffId: string;
  courseId: string;
  currentUnitId: string;
  isCompleted: boolean;
  startedAt: string;
  completedAt: null | string;
  lastAccessedAt: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  unit: ActiveStep;
  module: ActiveStep | null;
};

export type Module = {
  id: string;
  title: string;
  slug: string;
  description: null | string;
  index: number;
  createdAt: string;
  unitId: string;
  moduleItems: ModuleItem[];
};

export type ModuleType = "CONTENT" | "PRACTICAL_APPLICATIONS" | "CASE_STUDY";

export type ModuleItem = {
  id: string;
  pdfUrl: string;
  signedPdfUrl: string;
  index: number;
  content: string;
  type: ModuleType;
  createdAt: string;
  moduleId: string;
  pages: ContentPage[];
};

export type ContentPage = {
  id: string;
  pageTitle: string;
  pageNumber: number;
  createdAt: string;
  moduleItemId: string;
};

export type UnitDetails = {
  id: string;
  title: string;
  slug: string;
  description: null | string;
  index: number;
  imageUrl: null | string;
  createdAt: string;
  courseId: string;
  modules: Module[];
};

export type UpdateModuleResponse = {
  id: string;
  staffId: string;
  courseId: string;
  currentUnitId: string;
  currentModuleId: string;
  isCompleted: boolean;
  startedAt: string;
  completedAt: null | string;
  lastAccessedAt: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateModulePayload = {
  moduleId: string;
};

export type GroupedModuleItems = {
  title: ModuleType;
  items: ModuleItem[];
};

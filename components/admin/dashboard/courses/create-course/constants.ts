import { ModuleTypeEnum } from "@/types/course";

export const emptyPage = {
  title: "",
  number: 1,
};

export const emptyModuleItem = {
  type: "",
  pdfFile: null,
  pages: [emptyPage],
};

export const emptyModule = {
  title: "",
  moduleItems: [emptyModuleItem],
};

export const emptyUnit = {
  title: "",
  modules: [emptyModule],
};

export const courseDurationOptions = [
  {
    label: "1 month",
    value: "30",
  },
  {
    label: "2 months",
    value: "60",
  },
  {
    label: "3 months",
    value: "90",
  },
  {
    label: "4 months",
    value: "120",
  },
  {
    label: "5 months",
    value: "150",
  },
  {
    label: "6 months",
    value: "180",
  },
];

export const validityPeriodOptions = [
  {
    label: "1 year",
    value: "365",
  },
  {
    label: "2 years",
    value: "730",
  },
  {
    label: "3 years",
    value: "1095",
  },
];

export const teachingLevelOptions = [
  {
    label: "Primary School Teachers",
    value: "PRIMARY",
  },
  {
    label: "Secondary School Teachers",
    value: "SECONDARY",
  },
  {
    label: "Higher Institution Teachers",
    value: "TERTIARY",
  },
  {
    label: "Mentors",
    value: "MENTOR",
  },
  {
    label: "Teaching Assistants",
    value: "TEACHER_ASSISTANT",
  },
];

export const moduleItemTypeOptions = [
  {
    label: "Content",
    value: ModuleTypeEnum.CONTENT,
  },
  {
    label: "Case study",
    value: ModuleTypeEnum.CASE_STUDY,
  },
  {
    label: "Practical applications",
    value: ModuleTypeEnum.PRACTICAL_APPLICATIONS,
  },
];

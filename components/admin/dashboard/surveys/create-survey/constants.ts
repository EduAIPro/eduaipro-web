import {
  SurveyQuestionTypeEnum,
  SurveyVisibilityEum,
} from "@/types/admin/surveys";
import {
  SurveyQuestionOptionFormValue,
  SurveyQuestionsFormValue,
} from "@/utils/validation/admin";

export const emptyOption: SurveyQuestionOptionFormValue = {
  label: "",
  description: "",
};

export const emptyQuestion: SurveyQuestionsFormValue = {
  type: "SHORT_TEXT",
  title: "",
  description: "",
  placeholder: "",
  isRequired: true,
  options: [emptyOption],
};

export const surveyVisibilityOptions = [
  {
    label: "All system users",
    value: SurveyVisibilityEum.SCHOOL_ONLY,
  },
  {
    label: "All school admins",
    value: SurveyVisibilityEum.ADMIN_ONLY,
  },
  {
    label: "All system teachers",
    value: SurveyVisibilityEum.TEACHER_ONLY,
  },
  {
    label: "A specific school",
    value: SurveyVisibilityEum.ONE_SCHOOL_ONLY,
  },
  {
    label: "Admins in a particular school",
    value: SurveyVisibilityEum.ONE_ADMIN_ONLY,
  },
  {
    label: "Teachers in a particular school",
    value: SurveyVisibilityEum.ONE_TEACHER_ONLY,
  },
];

export const questionTypesOptions = [
  {
    label: "Text",
    value: SurveyQuestionTypeEnum.SHORT_TEXT,
  },
  {
    label: "Multiple Choice",
    value: SurveyQuestionTypeEnum.MULTIPLE_CHOICE_MULTIPLE,
  },
  {
    label: "Single Choice",
    value: SurveyQuestionTypeEnum.MULTIPLE_CHOICE_SINGLE,
  },
];

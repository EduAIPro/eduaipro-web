import { SurveyVisibilityEum } from "@/types/admin/surveys";
import * as Yup from "yup";

const surveyQuestionOptionValidation = Yup.object().shape({
  label: Yup.string().required("Option label is a required value"),
  description: Yup.string().optional(),
});

const surveyQuestionsValidation = Yup.object().shape({
  type: Yup.string()
    .oneOf(
      ["SHORT_TEXT", "MULTIPLE_CHOICE_MULTIPLE", "MULTIPLE_CHOICE_SINGLE"],
      "Question type must be SHORT_TEXT, MULTIPLE_CHOICE_MULTIPLE, MULTIPLE_CHOICE_SINGLE"
    )
    .required("Question type is a required value"),
  title: Yup.string()
    .required("Question title is a required value")
    .min(2, "Question title must be at least two characters long"),
  description: Yup.string().optional(),
  placeholder: Yup.string().optional(),
  isRequired: Yup.boolean().required(
    "You must indicate whether this question is required or not"
  ),
  options: Yup.array().when("type", {
    is: (type: string) =>
      ["MULTIPLE_CHOICE_MULTIPLE", "MULTIPLE_CHOICE_SINGLE"].includes(type),
    then: (schema) =>
      schema
        .of(surveyQuestionOptionValidation)
        .required("Options are required for multiple choice questions")
        .min(2, "Multiple choice questions must have at least 2 options"),
    otherwise: (schema) => schema.optional(),
  }),
});

export const createSurveyValidation = Yup.object().shape({
  title: Yup.string()
    .required("Survey title is a required value")
    .min(2, "Survey title must be at least two characters long"),
  description: Yup.string()
    .required("Survey description is a required value")
    .min(2, "Survey description must be at least two characters long"),
  visibility: Yup.string()
    .oneOf(
      [
        SurveyVisibilityEum.TEACHER_ONLY,
        SurveyVisibilityEum.SCHOOL_ONLY,
        SurveyVisibilityEum.ONE_TEACHER_ONLY,
        SurveyVisibilityEum.ONE_SCHOOL_ONLY,
        SurveyVisibilityEum.ONE_ADMIN_ONLY,
        SurveyVisibilityEum.ADMIN_ONLY,
      ],
      "Survey visibility must be SCHOOL_ONLY, ADMIN_ONLY, TEACHER_ONLY"
    )
    .required("Survey visibility is a required value"),
  triggerType: Yup.string()
    .required("Trigger type is a required value")
    .min(2, "Trigger type must be at least two characters long"),
  // triggerMetadata: Yup.object().optional(),
  courseId: Yup.string().optional(),
  unitId: Yup.string().optional(),
  moduleId: Yup.string().optional(),
  startsAt: Yup.string().required("Survey start date is a required value"),
  endsAt: Yup.string().required("Survey end date is a required value"),
  thankyouMessage: Yup.string().optional(),
  schoolId: Yup.array().of(Yup.string()).optional(),
  questions: Yup.array()
    .of(surveyQuestionsValidation)
    .required("You must have at least one question for every survey"),
});

export type CreateSurveyFormValue = Yup.InferType<
  typeof createSurveyValidation
>;
export type SurveyQuestionsFormValue = Yup.InferType<
  typeof surveyQuestionsValidation
>;
export type SurveyQuestionOptionFormValue = Yup.InferType<
  typeof surveyQuestionOptionValidation
>;

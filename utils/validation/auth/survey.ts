import * as Yup from "yup";
import { InferType } from "yup";

export const personalInfoValidation = Yup.object().shape({
  dateOfBirth: Yup.string().required("Date of birth is required"),
  schoolName: Yup.string().optional(),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .optional(),
  location: Yup.string().required("Your location is required"),
});

export const professionalBackgroundValidation = Yup.object().shape({
  teachingLevel: Yup.string().required("Your professional level is required"),
  educationLevel: Yup.string().required("Your educational level is required"),
  areaOfSpecialization: Yup.string().required(
    "An area of specialization is required"
  ),
  interestInSkills: Yup.string().required("Your skills interest are required"),
  yearsOfExperience: Yup.string().required(
    "Your years of experience are required"
  ),
});

export const goalsValidation = Yup.object().shape({
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  learningGoals: Yup.string().required(
    "Your learning goals are required to tailor your experience"
  ),
  otherLearningGoals: Yup.string(),
});

export type GoalsFormValue = InferType<typeof goalsValidation>;
export type PersonalInfoFormValue = InferType<typeof personalInfoValidation>;
export type ProfessionalBackgroundFormValue = InferType<
  typeof professionalBackgroundValidation
>;

import * as Yup from "yup";
import { passwordValidation } from "..";
import { phoneValidation } from "../auth/signup/signup.schema";

export const personalInfoValidation = Yup.object().shape({
  name: Yup.string()
    .required("Full name is a required value")
    .min(2, "Full name must be at least two characters long"),
  email: Yup.string()
    .required("Email address is a required value")
    .email("Please enter a valid email"),
  position: Yup.string()
    .required("Position is a required value")
    .min(2, "Position must be at least two characters long"),
  phone: phoneValidation.required("Your phone number is required"),
});

export type PersonalInfoFormValue = Yup.InferType<
  typeof personalInfoValidation
>;

export const schoolInfoValidation = Yup.object().shape({
  institutionName: Yup.string()
    .required("Institution name is a required value")
    .min(2, "Institution name must be at least two characters long"),
  contactEmail: Yup.string()
    .required("Contact email is a required value")
    .email("Please enter a valid email"),
  state: Yup.string()
    .required("State is a required value")
    .min(2, "State must be at least two characters long"),
  city: Yup.string()
    .required("City is a required value")
    .min(2, "City must be at least two characters long"),
  address: Yup.string()
    .required("Address is a required value")
    .min(2, "Address must be at least two characters long"),
  contactPhone: phoneValidation.required("Contact phone number is required"),
});

export type SchoolInfoFormValue = Yup.InferType<typeof schoolInfoValidation>;

export const changePassowordValidation = Yup.object().shape({
  oldPassword: passwordValidation.required(
    "Former password is a required value"
  ),
  newPassword: passwordValidation.required("New password is a required value"),
  confirmPassword: passwordValidation.required(
    "Password confirmation is a required value"
  ),
});

export type ChangePasswordFormValue = Yup.InferType<
  typeof changePassowordValidation
>;

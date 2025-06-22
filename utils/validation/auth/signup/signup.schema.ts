import * as Yup from "yup";
import { passwordValidation } from "../..";

export const phoneValidation = Yup.string().matches(
  /^(\+\d{1,4}\s?)?[\d\s-]+$/,
  "Please enter a valid phone number"
);

export const createAccountValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required value")
    .min(2, "Your name must be at least two characters long"),
  position: Yup.string().required("Your official position is a required value"),
  email: Yup.string().email().required("Email address is required"),
  phone: phoneValidation.required("Your phone number is required"),
  password: passwordValidation.required("Password is a required value"),
  confirmPassword: passwordValidation.required(
    "Password confirmation is a required value"
  ),
});

export type CreateAccountFormValue = Yup.InferType<
  typeof createAccountValidation
>;

export const setupAccountValidation = Yup.object().shape({
  institutionName: Yup.string()
    .required("Name is a required value")
    .min(2, "Your name must be at least two characters long"),
  type: Yup.string().required("Select an institution type"),
  state: Yup.string()
    .required("State is a required value")
    .min(2, "State must be at least two characters long"),
  city: Yup.string()
    .required("City is a required value")
    .min(2, "City must be at least two characters long"),
  address: Yup.string()
    .required("Address is a required value")
    .min(2, "Address must be at least two characters long"),
  contactEmail: Yup.string()
    .email()
    .required("Email address is a required value"),
  contactPhone: phoneValidation.required("Your phone number is required"),
});

export type SetupAccountFormValue = Yup.InferType<
  typeof setupAccountValidation
>;

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
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: passwordValidation.required("Password is a required value"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  phone: Yup.object().shape({
    dialCode: Yup.string().required("Select a country code"),
    digits: phoneValidation.required("Your phone number is a required value"),
  }),
});

export type CreateAccountFormValue = Yup.InferType<
  typeof createAccountValidation
>;

export const setupAccountValidation = Yup.object().shape({
  institutionName: Yup.string()
    .required("Institution name is required")
    .min(2, "Institution name must be at least 2 characters"),
  state: Yup.string()
    .required("State is a required value")
    .min(2, "State must be at least two characters long"),
  city: Yup.string()
    .required("City is a required value")
    .min(2, "City must be at least two characters long"),
  country: Yup.string().required("Country is a required value"),
  address: Yup.string()
    .required("Address is a required value")
    .min(2, "Address must be at least two characters long"),
  contactEmail: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is a required value"),
  contactPhone: Yup.object().shape({
    dialCode: Yup.string().required("Select a country code"),
    digits: phoneValidation.required(
      "Contact phone number is a required value"
    ),
  }),
});

export type SetupAccountFormValue = Yup.InferType<
  typeof setupAccountValidation
>;

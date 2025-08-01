import * as Yup from "yup";
import yupPassword from "yup-password";
yupPassword(Yup);

// Validation schemas for each step
export const loginValidation = Yup.object().shape({
  email: Yup.string().email().required("Email address is required"),
  password: Yup.string().password().required("Your password is required"),
});

export const adminSignupValidation = Yup.object().shape({
  adminName: Yup.string()
    .required("The admin's name is required")
    .min(2, "The admin's name must be at least two characters long"),
  adminRole: Yup.string().required("A role is required"),
  email: Yup.string().email().required("Email address is required"),
  password: Yup.string().password().required("Your password is required"),
  confirmPassword: Yup.string()
    .password()
    .required("You must confirm your passowrd before you can proceed"),
});

export const institutionSignupValidation = Yup.object().shape({
  name: Yup.string()
    .required("The institution's name is required")
    .min(2, "The institution's name must be at least two characters long"),
  type: Yup.string().required("An institution type is required"),
  email: Yup.string().email().required("Email address is required"),
  staffCount: Yup.string().required("Staff count is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Your phone number is required"),
  location: Yup.string().required("The institution's address is required"),
  acceptsTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  password: Yup.string().password().required("A password is required"),
  confirmPassword: Yup.string()
    .password()
    .required("You must confirm the passowrd before you can proceed"),
});

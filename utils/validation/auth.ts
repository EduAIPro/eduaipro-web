import * as Yup from "yup";
import yupPassword from "yup-password";
yupPassword(Yup);

// Validation schemas for each step
export const loginValidation = Yup.object().shape({
  email: Yup.string().email().required("Email address is required"),
  password: Yup.string().password().required("Your password is required"),
});

export const signupValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("Your first name is required")
    .min(2, "Your first name must be at least two characters long"),
  lastName: Yup.string()
    .required("Your last name is required")
    .min(2, "Your last name must be at least two characters long"),
  username: Yup.string()
    .required("A username is required")
    .min(4, "Your username must be at least 4 characters long"),
  email: Yup.string().email().required("Email address is required"),
  password: Yup.string().password().required("Your password is required"),
  confirmPassword: Yup.string()
    .password()
    .required("You must confirm your passowrd before you can proceed"),
});

import * as Yup from "yup";
import { InferType } from "yup";
import yupPassword from "yup-password";
import { phoneValidation } from "./school/signup.schema";
yupPassword(Yup);

export const signupValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("Your first name is a required value")
    .min(2, "Your first name must be at least two characters long"),
  lastName: Yup.string()
    .required("Your last name is a required value")
    .min(2, "Your last name must be at least two characters long"),
  username: Yup.string()
    .required("A username is a required value")
    .min(4, "Your username must be at least 4 characters long"),
  email: Yup.string().email().required("Email address is a required value"),
  password: Yup.string()
    .password()
    .required("Your password is a required value"),
  confirmPassword: Yup.string()
    .password()
    .required("You must confirm your password before you can proceed"),
  phoneNumber: Yup.object().shape({
    dialCode: Yup.string().required("Country dialcode is required"),
    digits: phoneValidation.required("Your phone number is a required value"),
  }),
});

export type SignupFormValue = InferType<typeof signupValidation>;

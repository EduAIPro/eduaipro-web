import * as Yup from "yup";
import { InferType } from "yup";
import yupPassword from "yup-password";
yupPassword(Yup);

export const personalInfoValidation = Yup.object().shape({
  fullName: Yup.string()
    .required("Your full name is a required value")
    .min(2, "Your first name must be at least two characters long"),
  //   position: Yup.string()
  //     .required("Your position is a required value")
  //     .min(4, "Your username must be at least 4 characters long"),
  email: Yup.string().email().required("Email address is a required value"),
  phoneNumber: Yup.string().required("Your phone number is a required value"),
  //   phoneNumber: Yup.object().shape({
  //     dialCode: Yup.string().required("Your country dialcode"),
  //     digits: Yup.string().required("Your phone number is a required value"),
  //   }),
});

export type PersonalInfoFormValue = InferType<typeof personalInfoValidation>;

export const editUserValidation = Yup.object().shape({
  userFirstName: Yup.string()
    .required("Your first name is a required value")
    .min(2, "Your first name must be at least two characters long"),
  userLastName: Yup.string()
    .required("Your last name is a required value")
    .min(2, "Your first name must be at least two characters long"),
  //   position: Yup.string()
  //     .required("Your position is a required value")
  //     .min(4, "Your username must be at least 4 characters long"),
  email: Yup.string().email().required("Email address is a required value"),
  phoneNumber: Yup.string().required("Your phone number is a required value"),
  //     digits: Yup.string().required("Your phone number is a required value"),
  //   }),
});

export type EditUserFormValue = InferType<typeof editUserValidation>;

export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .password()
    .required("Your old password is a required value"),
  password: Yup.string()
    .password()
    .required("Your new password is a required value"),
  confirmPassword: Yup.string()
    .password()
    .required("You must confirm your new password before you can proceed"),
});

export type ChangePasswordFormValue = InferType<
  typeof changePasswordValidation
>;

import * as Yup from "yup";
import { InferType } from "yup";
import yupPassword from "yup-password";
yupPassword(Yup);

export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .password()
    .required("New password is a required value"),
  confirmPassword: Yup.string()
    .password()
    .required("Password confirmaion is a required value"),
});

export type ResetPasswordFormValue = InferType<typeof resetPasswordValidation>;

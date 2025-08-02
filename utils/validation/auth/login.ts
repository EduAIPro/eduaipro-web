import * as Yup from "yup";
import { InferType } from "yup";
import yupPassword from "yup-password";
yupPassword(Yup);

export const loginValidation = Yup.object().shape({
  email: Yup.string().email().required("Email address is required"),
  password: Yup.string().password().required("Your password is required"),
});

export type LoginFormValue = InferType<typeof loginValidation>;

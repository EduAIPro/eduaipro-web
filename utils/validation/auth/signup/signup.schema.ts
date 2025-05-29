import * as Yup from "yup";

const phoneValidation = Yup.string().matches(
  /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/,
  "Please enter a valid phone number"
);

export const createAccountValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is a required value")
    .min(2, "Your name must be at least two characters long"),
  position: Yup.string().required("Your official position is a required value"),
  email: Yup.string().email().required("Email address is required"),
  phone: phoneValidation.required("Your phone number is required"),
  password: Yup.string().password().required("Your password is required"),
  confirmPassword: Yup.string()
    .password()
    .required("You must confirm your passowrd before you can proceed"),
});

export type CreateAccountFormValue = Yup.InferType<
  typeof createAccountValidation
>;

export const setupAccountValidation = Yup.object().shape({
  institutionName: Yup.string()
    .required("Name is a required value")
    .min(2, "Your name must be at least two characters long"),
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

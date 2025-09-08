import * as Yup from "yup";
import { phoneValidation } from "../auth/school/signup.schema";

export const editSchoolInfoValidation = Yup.object().shape({
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
  streetAddress: Yup.string()
    .required("Address is a required value")
    .min(2, "Address must be at least two characters long"),
  contactPhone: Yup.object().shape({
    dialCode: Yup.string().required("Country dialcode is required"),
    digits: phoneValidation.required(
      "Contact phone number is a required value"
    ),
  }),
});

export type EditSchoolInfoFormValue = Yup.InferType<
  typeof editSchoolInfoValidation
>;

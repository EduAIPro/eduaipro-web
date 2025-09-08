import * as Yup from "yup";

export const sendMessageValidation = Yup.object().shape({
  title: Yup.string()
    .required("Message title is a required value")
    .min(2, "Message title must be at least two characters long"),
  body: Yup.string()
    .required("Message body is a required value")
    .min(2, "Message body must be at least two characters long"),
  recipient: Yup.string()
    .oneOf(
      ["TEACHER", "SCHOOL", "COUNTRY"],
      "Recipient type must be TEACHER, SCHOOL, or COUNTRY"
    )
    .required("Message recipient is a required value"),
  type: Yup.string()
    .oneOf(
      ["INFO", "ALERT", "WARNING", "REMINDER"],
      "Message type must be INFO, ALERT, WARNING, or REMINDER"
    )
    .required("Message type is a required value"),
  countryIds: Yup.array()
    .of(Yup.string())
    .when("recipient", {
      is: "COUNTRY",
      then: (schema) =>
        schema
          .min(1, "At least one country must be selected")
          .required("Country selection is required"),
      otherwise: (schema) => schema.optional(),
    }),

  schoolIds: Yup.array()
    .of(Yup.string())
    .when("recipient", {
      is: "SCHOOL",
      then: (schema) =>
        schema
          .min(1, "At least one school must be selected")
          .required("School selection is required"),
      otherwise: (schema) => schema.optional(),
    }),

  teacherLevels: Yup.array()
    .of(Yup.string())
    .when("recipient", {
      is: "TEACHER",
      then: (schema) =>
        schema
          .min(1, "At least one teacher level must be selected")
          .required("Teacher level selection is required"),
      otherwise: (schema) => schema.optional(),
    }),
});

export type SendMessageFormValue = Yup.InferType<typeof sendMessageValidation>;

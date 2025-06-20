import * as Yup from "yup";

export const sendMessageValidation = Yup.object().shape({
  title: Yup.string()
    .required("Message title is a required value")
    .min(2, "Message title must be at least two characters long"),
  body: Yup.string()
    .required("Message body is a required value")
    .min(2, "Message body must be at least two characters long"),
  recipient: Yup.string().required("Select a recipient"),
});

export type SendMessageFormValue = Yup.InferType<typeof sendMessageValidation>;

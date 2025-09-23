import * as Yup from "yup";

export const createTicketValidation = Yup.object().shape({
  category: Yup.string()
    .oneOf(
      [
        "GENERAL",
        "TECHNICAL_ISSUE",
        "CONTENT_FEEDBACK",
        "ACCOUNT_HELP",
        "OTHER",
      ],
      "Message type must be GENERAL, TECHNICAL_ISSUE, CONTENT_FEEDBACK, ACCOUNT_HELP or OTHER"
    )
    .required("Message title is a required value"),

  message: Yup.string()
    .required("Message body is a required value")
    .min(2, "Message body must be at least two characters long"),
});

export type CreateTicketFormValue = Yup.InferType<
  typeof createTicketValidation
>;

import * as Yup from "yup";

export const sendGiftSchema = Yup.object({
  amountMinutes: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .integer("Amount must be a whole number")
    .required("Amount is required"),
  message: Yup.string()
    .trim()
    .max(70, "Message must be at most 70 characters")
    .required("Message is required"),
});

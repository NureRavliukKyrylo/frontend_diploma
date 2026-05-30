import * as Yup from "yup";

export const checkInValidationSchema = Yup.object({
  note: Yup.string().max(50, "Note must be 50 characters or less"),
});

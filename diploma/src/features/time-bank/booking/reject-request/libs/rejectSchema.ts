import * as Yup from "yup";

export const rejectSchema = Yup.object({
  reason: Yup.string()
    .trim()
    .max(100, "Reason must be at most 100 characters")
    .required("Reason is required"),
});

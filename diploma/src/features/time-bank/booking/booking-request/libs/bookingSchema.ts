import * as Yup from "yup";

export const bookingSchema = Yup.object({
  comment: Yup.string()
    .trim()
    .max(150, "Comment must be at most 150 characters")
    .required("Comment is required"),
});

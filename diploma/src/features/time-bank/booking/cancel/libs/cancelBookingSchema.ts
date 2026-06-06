import * as Yup from "yup";

export const cancelBookingSchema = Yup.object({
  comment: Yup.string()
    .trim()
    .max(100, "Comment must be at most 100 characters")
    .required("Comment is required"),
});

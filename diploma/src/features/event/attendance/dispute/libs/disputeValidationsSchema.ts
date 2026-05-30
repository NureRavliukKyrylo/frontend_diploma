import * as Yup from "yup";

export const disputeValidationSchema = Yup.object({
  comment: Yup.string()
    .required("Comment is required")
    .max(50, "Comment must be 50 characters or less"),
});

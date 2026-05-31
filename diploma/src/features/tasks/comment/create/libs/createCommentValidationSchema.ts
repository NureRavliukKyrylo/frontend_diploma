import * as Yup from "yup";

export const createCommentValidationSchema = Yup.object({
  body: Yup.string()
    .required("Comment is required")
    .max(50, "Comment must be 50 characters or less"),
});

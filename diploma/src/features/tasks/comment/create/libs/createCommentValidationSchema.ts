import * as Yup from "yup";

export const createCommentValidationSchema = Yup.object({
  body: Yup.string()
    .required("Comment is required")
    .max(80, "Comment must be 80 characters or less"),
});

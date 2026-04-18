import * as yup from "yup";

export const feedbackSchema = yup.object({
  rating: yup.number().min(1, "Rating is required").required(),
  comment: yup.string().max(150, "Comment must be at most 150 characters"),
});

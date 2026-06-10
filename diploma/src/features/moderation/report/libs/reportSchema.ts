import * as Yup from "yup";

export const reportSchema = Yup.object({
  reason: Yup.string().required("Please select a reason"),
  details: Yup.string()
    .trim()
    .max(200, "Details must be at most 200 characters")
    .required("Details are required"),
});

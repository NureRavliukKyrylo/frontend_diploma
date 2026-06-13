import * as Yup from "yup";

export const blockUserSchema = Yup.object({
  reason: Yup.string().required("Please select a reason"),
});

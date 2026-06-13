import * as Yup from "yup";

export const hideContentSchema = Yup.object({
  reason: Yup.string().required("Please select a reason"),
});

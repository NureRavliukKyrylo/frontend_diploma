import * as Yup from "yup";

export const banUserSchema = Yup.object({
  reason: Yup.string().required("Please select a reason"),
  expiresAt: Yup.string().required("Please select an expiration date"),
});

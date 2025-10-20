import * as Yup from "yup";

export const verifyEmailSchema = Yup.object({
  code: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Code must be a 6-digit number"),
});

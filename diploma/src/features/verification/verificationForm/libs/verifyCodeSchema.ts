import * as Yup from "yup";

export const verifyCodeSchema = Yup.object({
  code: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Code must be a 6-digit number"),
});

import * as Yup from "yup";

export const verifyCodeSchema = Yup.object({
  code: Yup.string()
    .length(6, "Code must be 6 digits")
    .matches(/^\d+$/, "Code must contain only digits")
    .required("Verification code is required"),
});

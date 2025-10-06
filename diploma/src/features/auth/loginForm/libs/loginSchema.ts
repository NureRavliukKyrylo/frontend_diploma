import * as Yup from "yup";

export const loginSchema = Yup.object({
  loginEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  loginPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

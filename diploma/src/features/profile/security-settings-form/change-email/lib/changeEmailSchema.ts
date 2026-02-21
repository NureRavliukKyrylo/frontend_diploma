import * as Yup from "yup";

export const changeEmailSchema = Yup.object({
  newEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

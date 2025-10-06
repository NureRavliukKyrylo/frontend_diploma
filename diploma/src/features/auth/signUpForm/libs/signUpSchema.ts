import * as Yup from "yup";

export const registerSchema = Yup.object({
  agreement: Yup.boolean().oneOf([true], "You must agree to the terms"),
  firstName: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
      "Please enter a valid full name"
    )
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
      "Please enter a valid full name"
    )
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),
  signUpEmail: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

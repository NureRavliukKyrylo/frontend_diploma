import * as Yup from "yup";

export const registerSchema = Yup.object({
  agreement: Yup.boolean()
    .oneOf([true], "You must agree to the terms")
    .required("You must agree to the terms"),
  firstName: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
      "Please enter a valid full name",
    )
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(
      /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
      "Please enter a valid full name",
    )
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
});

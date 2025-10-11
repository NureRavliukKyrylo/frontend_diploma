import * as Yup from "yup";

const today = new Date();
const minDate = new Date(
  today.getFullYear() - 100,
  today.getMonth(),
  today.getDate()
);
const maxDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

export const aboutFormSchema = Yup.object({
  about: Yup.string().required("About is required"),
  dateOfBirth: Yup.date()
    .nullable()
    .required("Date of birth is required")
    .max(maxDate, "You must be at least 18 years old")
    .min(minDate, "Age cannot be more than 100 years")
    .typeError("Invalid date"),
});

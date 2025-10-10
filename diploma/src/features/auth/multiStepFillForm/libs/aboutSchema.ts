import * as Yup from "yup";

export const aboutFormSchema = Yup.object({
  about: Yup.string().required("About is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
});

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
  about: Yup.string(),
  dateOfBirth: Yup.date()
    .nullable()
    .max(maxDate, "You must be at least 18 years old")
    .min(minDate, "Age cannot be more than 100 years")
    .typeError("Invalid date"),
}).test({
  name: "at-least-one-field",
  message: "At least one field (About or Date of Birth) is required",
  test: function (value) {
    const { about, dateOfBirth } = value;
    if (!about && !dateOfBirth) {
      return this.createError({
        path: "about",
      });
    }
    return true;
  },
});

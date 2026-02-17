import * as Yup from "yup";

const NAME_REGEX = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/;

const today = new Date();

const minDate = new Date(
  today.getFullYear() - 100,
  today.getMonth(),
  today.getDate(),
);

const maxDate = new Date(
  today.getFullYear() - 14,
  today.getMonth(),
  today.getDate(),
);

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const settingsMainFormSchema = Yup.object({
  firstName: Yup.string()
    .matches(NAME_REGEX, "Please enter a valid first name")
    .min(2, "First name is too short")
    .max(50, "First name is too long")
    .required("First name is required"),

  lastName: Yup.string()
    .matches(NAME_REGEX, "Please enter a valid last name")
    .min(2, "Last name is too short")
    .max(50, "Last name is too long")
    .required("Last name is required"),

  about: Yup.string()
    .nullable()
    .min(15, "Biography must contain at least 15 characters")
    .max(500, "Biography is too long"),

  dateOfBirth: Yup.date()
    .nullable()
    .typeError("Invalid date")
    .max(maxDate, "You must be at least 14 years old")
    .min(minDate, "Age cannot be more than 100 years"),

  avatar: Yup.mixed<File | string>()
    .nullable()
    .test(
      "fileType",
      "Only JPG, JPEG, PNG, SVG or GIF images are allowed",
      (value) => {
        if (!value) return true;

        if (typeof value === "string") return true;

        return SUPPORTED_FORMATS.includes(value.type);
      },
    )
    .test("fileSize", "File too large (max 5MB)", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true;

      return value.size <= MAX_FILE_SIZE;
    }),
});

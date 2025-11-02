import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

export const imageSchema = Yup.object({
  avatar: Yup.mixed<File>()
    .nullable()
    .required("Please upload an image")
    .test(
      "fileType",
      "Only JPG, JPEG, or PNG images are allowed",
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large (max 5MB)",
      (value) => !value || value.size <= 5 * 1024 * 1024
    ),
});

import * as Yup from "yup";

const websiteRegex =
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

export const organizationCreateBasicInfoSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Organization name should contain at least 2 characters.")
    .max(120, "Organization name should be 120 characters or less.")
    .required("Organization name is required."),
  website: Yup.string()
    .trim()
    .max(200, "Website should be 200 characters or less.")
    .test(
      "organization-website",
      "Enter a valid website URL.",
      (value) => !value || websiteRegex.test(value),
    ),
  contactEmail: Yup.string()
    .trim()
    .email("Enter a valid email address.")
    .max(160, "Email should be 160 characters or less."),
  description: Yup.string()
    .trim()
    .min(20, "Description should contain at least 20 characters.")
    .max(1000, "Description should be 1000 characters or less.")
    .required("Description is required."),
});

import * as Yup from "yup";

export const contactsSchema = Yup.object({
  instagram: Yup.string()
    .url("Enter a valid link")
    .required("Instagram link is required")
    .nullable(),
  showInstagram: Yup.boolean(),
});

import * as Yup from "yup";

export const contactsSchema = Yup.object({
  instagram: Yup.string().url("Enter a valid link").nullable(),
  showInstagram: Yup.boolean(),
});

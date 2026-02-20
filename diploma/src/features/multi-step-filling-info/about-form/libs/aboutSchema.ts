import { dateField, textField } from "@shared/libs";
import * as Yup from "yup";

export const aboutFormSchema = Yup.object({
  about: textField({ min: 15, max: 300 }),
  dateOfBirth: dateField(),
});

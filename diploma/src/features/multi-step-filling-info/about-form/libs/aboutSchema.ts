import { dateField, textField } from "@shared/libs/validation";
import * as Yup from "yup";

export const aboutFormSchema = Yup.object({
  about: textField({ min: 15, max: 300 }),
  dateOfBirth: dateField(),
});

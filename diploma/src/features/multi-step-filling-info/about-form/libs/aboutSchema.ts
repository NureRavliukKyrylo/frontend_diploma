import { dateField, textField } from "@shared/libs/validation";
import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getAboutFormSchema = (t: TFunction) =>
  Yup.object({
    about: textField({ min: 15, max: 300 }, t),
    dateOfBirth: dateField({}, t),
  });

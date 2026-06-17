import * as Yup from "yup";
import {
  dateField,
  fileField,
  nameField,
  textField,
} from "@shared/libs/validation";
import type { TFunction } from "i18next";

export const getSettingsMainFormSchema = (t: TFunction) =>
  Yup.object({
    firstName: nameField(
      { requiredMessage: t("common:validation.firstNameRequired") },
      t,
    ),
    lastName: nameField(
      { requiredMessage: t("common:validation.lastNameRequired") },
      t,
    ),
    about: textField({ min: 15, max: 300 }, t),
    dateOfBirth: dateField({}, t),
    avatar: fileField({ maxSize: 5 * 1024 * 1024 }, t),
  });

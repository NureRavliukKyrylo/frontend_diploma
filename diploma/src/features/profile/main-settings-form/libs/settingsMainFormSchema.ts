import * as Yup from "yup";
import { nameField, textField, dateField, fileField } from "@shared/libs";

export const settingsMainFormSchema = Yup.object({
  firstName: nameField({ requiredMessage: "First name is required" }),
  lastName: nameField({ requiredMessage: "Last name is required" }),
  about: textField({ min: 15, max: 300 }),
  dateOfBirth: dateField(),
  avatar: fileField({ maxSize: 5 * 1024 * 1024 }),
});

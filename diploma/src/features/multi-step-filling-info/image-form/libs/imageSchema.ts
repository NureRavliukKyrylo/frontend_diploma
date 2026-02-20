import { fileField } from "@shared/libs";
import * as Yup from "yup";

export const imageSchema = Yup.object({
  avatar: fileField({ maxSize: 5 * 1024 * 1024 }),
});

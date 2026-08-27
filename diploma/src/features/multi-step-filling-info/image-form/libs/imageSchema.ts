import { fileField } from "@shared/libs/validation";
import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getImageSchema = (t: TFunction) =>
  Yup.object({
    avatar: fileField({ maxSize: 5 * 1024 * 1024 }, t),
  });

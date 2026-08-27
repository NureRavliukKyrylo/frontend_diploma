import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getCheckOutValidationSchema = (t: TFunction) =>
  Yup.object({
    note: Yup.string().max(50, t("event:checkOut.validation.noteMax")),
  });

import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getRejectSchema = (t: TFunction) =>
  Yup.object({
    reason: Yup.string()
      .trim()
      .max(100, t("timeBank:bookings.validation.reasonMax"))
      .required(t("timeBank:bookings.validation.reasonRequired")),
  });

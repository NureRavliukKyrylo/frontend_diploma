import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getRejectOfferChangeSchema = (t: TFunction) =>
  Yup.object({
    comment: Yup.string()
      .trim()
      .max(100, t("timeBank:bookings.validation.commentMax", { max: 100 }))
      .required(t("timeBank:bookings.validation.commentRequired")),
  });

import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getBookingSchema = (t: TFunction) =>
  Yup.object({
    comment: Yup.string()
      .trim()
      .max(150, t("timeBank:bookings.validation.commentMax", { max: 150 }))
      .required(t("timeBank:bookings.validation.commentRequired")),
  });

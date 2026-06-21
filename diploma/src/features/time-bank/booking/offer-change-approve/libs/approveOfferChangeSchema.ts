import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getApproveOfferChangeSchema = (t: TFunction) =>
  Yup.object({
    comment: Yup.string()
      .trim()
      .max(100, t("timeBank:bookings.validation.commentMax", { max: 100 })),
  });

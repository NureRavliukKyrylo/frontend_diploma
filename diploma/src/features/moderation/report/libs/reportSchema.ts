import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getReportSchema = (t: TFunction) =>
  Yup.object({
    reason: Yup.string().required(
      t("moderation:report.validation.reasonRequired"),
    ),
    details: Yup.string()
      .trim()
      .max(200, t("moderation:report.validation.detailsMax"))
      .required(t("moderation:report.validation.detailsRequired")),
  });

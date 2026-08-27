import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getBanEntitySchema = (t: TFunction) =>
  Yup.object({
    reason: Yup.mixed().required(
      t("moderation:banEntity.validation.reasonRequired"),
    ),
  });

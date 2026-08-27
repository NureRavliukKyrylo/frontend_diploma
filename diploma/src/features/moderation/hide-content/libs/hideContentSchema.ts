import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getHideContentSchema = (t: TFunction) =>
  Yup.object({
    reason: Yup.mixed().required(
      t("moderation:hideContent.validation.reasonRequired"),
    ),
  });

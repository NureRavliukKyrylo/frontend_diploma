import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getBanUserSchema = (t: TFunction) =>
  Yup.object({
    reason: Yup.mixed().required(
      t("moderation:banUser.validation.reasonRequired"),
    ),
    expiresAt: Yup.string().required(
      t("moderation:banUser.validation.expiresAtRequired"),
    ),
  });

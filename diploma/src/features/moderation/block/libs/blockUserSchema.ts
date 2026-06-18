import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getBlockUserSchema = (t: TFunction) =>
  Yup.object({
    reason: Yup.mixed().required(
      t("moderation:blockUser.validation.reasonRequired"),
    ),
  });

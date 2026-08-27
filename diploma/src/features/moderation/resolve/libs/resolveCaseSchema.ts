import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getResolveCaseSchema = (t: TFunction) =>
  Yup.object({
    comment: Yup.string()
      .trim()
      .max(150, t("moderation:resolveCase.validation.commentMaxLength"))
      .required(t("moderation:resolveCase.validation.commentRequired")),
  });

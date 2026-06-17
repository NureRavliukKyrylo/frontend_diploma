import type { TFunction } from "i18next";
import * as Yup from "yup";

export const getEditCommentValidationSchema = (t: TFunction) =>
  Yup.object({
    body: Yup.string()
      .required(t("task:comments.validation.bodyRequired"))
      .max(80, t("task:comments.validation.bodyMax")),
  });

import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getCreateCommentValidationSchema = (t: TFunction) =>
  Yup.object({
    body: Yup.string()
      .required(t("task:comments.validation.bodyRequired"))
      .max(80, t("task:comments.validation.bodyMax")),
  });

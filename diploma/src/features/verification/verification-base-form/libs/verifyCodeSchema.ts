import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getVerifyCodeSchema = (t: TFunction) =>
  Yup.object({
    code: Yup.string()
      .length(6, t("common:validation.codeMustBe6Digits"))
      .matches(/^\d+$/, t("common:validation.codeOnlyDigits"))
      .required(t("common:validation.codeRequired")),
  });

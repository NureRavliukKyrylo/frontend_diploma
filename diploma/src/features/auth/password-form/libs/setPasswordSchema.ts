import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getSetPasswordSchema = (t: TFunction) =>
  Yup.object().shape({
    newPassword: Yup.string()
      .min(8, t("common:validation.passwordTooShort"))
      .matches(/[A-Z]/, t("common:validation.passwordUppercase"))
      .matches(/[a-z]/, t("common:validation.passwordLowercase"))
      .matches(/[0-9]/, t("common:validation.passwordNumber"))
      .matches(/[@$!%*?&]/, t("common:validation.passwordSpecial"))
      .required(t("common:validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], t("common:validation.passwordsMatch"))
      .required(t("common:validation.confirmPasswordRequired")),
  });

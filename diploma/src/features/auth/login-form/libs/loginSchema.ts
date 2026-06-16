import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getLoginSchema = (t: TFunction) =>
  Yup.object({
    email: Yup.string()
      .email(t("common:validation.invalidEmail"))
      .required(t("common:validation.emailRequired")),
    password: Yup.string().required(t("common:validation.passwordRequired")),
  });

import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getForgotPasswordSchema = (t: TFunction) =>
  Yup.object({
    email: Yup.string()
      .email(t("common:validation.invalidEmail"))
      .required(t("common:validation.emailRequired")),
  });

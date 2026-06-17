import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getChangeEmailSchema = (t: TFunction) =>
  Yup.object({
    newEmail: Yup.string()
      .email(t("common:validation.invalidEmail"))
      .required(t("common:validation.emailRequired")),
  });

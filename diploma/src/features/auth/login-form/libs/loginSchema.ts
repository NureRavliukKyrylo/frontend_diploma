import * as Yup from "yup";
import type { TFunction } from "i18next";

const validationMessages: Record<string, string> = {
  "common:validation.invalidEmail": "Please enter a valid email address",
  "common:validation.emailRequired": "Email is required",
  "common:validation.passwordRequired": "Password is required",
};

const defaultT = ((key: string) => validationMessages[key] ?? key) as TFunction;

export const getLoginSchema = (t: TFunction) =>
  Yup.object({
    email: Yup.string()
      .email(t("common:validation.invalidEmail"))
      .required(t("common:validation.emailRequired")),
    password: Yup.string().required(t("common:validation.passwordRequired")),
  });

export const loginSchema = getLoginSchema(defaultT);

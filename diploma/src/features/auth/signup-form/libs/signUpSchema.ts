import * as Yup from "yup";
import type { TFunction } from "i18next";

const validationMessages: Record<string, string> = {
  "common:validation.agreementRequired": "You must agree to the terms",
  "common:validation.invalidName": "Please enter a valid full name",
  "common:validation.firstNameTooShort": "First name is too short",
  "common:validation.firstNameTooLong": "First name is too long",
  "common:validation.firstNameRequired": "First name is required",
  "common:validation.lastNameTooShort": "Last name is too short",
  "common:validation.lastNameTooLong": "Last name is too long",
  "common:validation.lastNameRequired": "Last name is required",
  "common:validation.invalidEmail": "Please enter a valid email address",
  "common:validation.emailRequired": "Email is required",
  "common:validation.passwordTooShort": "Password must be at least 8 characters",
  "common:validation.passwordUppercase":
    "Password must contain at least one uppercase letter",
  "common:validation.passwordLowercase":
    "Password must contain at least one lowercase letter",
  "common:validation.passwordNumber":
    "Password must contain at least one number",
  "common:validation.passwordSpecial":
    "Password must contain at least one special character",
  "common:validation.passwordRequired": "Password is required",
};

const defaultT = ((key: string) => validationMessages[key] ?? key) as TFunction;

export const getRegisterSchema = (t: TFunction) =>
  Yup.object({
    agreement: Yup.boolean()
      .oneOf([true], t("common:validation.agreementRequired"))
      .required(t("common:validation.agreementRequired")),
    firstName: Yup.string()
      .matches(
        /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
        t("common:validation.invalidName"),
      )
      .min(2, t("common:validation.firstNameTooShort"))
      .max(50, t("common:validation.firstNameTooLong"))
      .required(t("common:validation.firstNameRequired")),
    lastName: Yup.string()
      .matches(
        /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/,
        t("common:validation.invalidName"),
      )
      .min(2, t("common:validation.lastNameTooShort"))
      .max(50, t("common:validation.lastNameTooLong"))
      .required(t("common:validation.lastNameRequired")),
    email: Yup.string()
      .email(t("common:validation.invalidEmail"))
      .required(t("common:validation.emailRequired")),
    password: Yup.string()
      .min(8, t("common:validation.passwordTooShort"))
      .matches(/[A-Z]/, t("common:validation.passwordUppercase"))
      .matches(/[a-z]/, t("common:validation.passwordLowercase"))
      .matches(/[0-9]/, t("common:validation.passwordNumber"))
      .matches(/[@$!%*?&]/, t("common:validation.passwordSpecial"))
      .required(t("common:validation.passwordRequired")),
  });

export const registerSchema = getRegisterSchema(defaultT);

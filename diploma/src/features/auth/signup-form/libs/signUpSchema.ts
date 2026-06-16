import * as Yup from "yup";
import type { TFunction } from "i18next";

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

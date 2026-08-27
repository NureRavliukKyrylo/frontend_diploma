import * as Yup from "yup";
import type { TFunction } from "i18next";

export const getSendGiftSchema = (t: TFunction) =>
  Yup.object({
    amountMinutes: Yup.number()
      .typeError(t("timeBank:gifts.validation.amountTypeError"))
      .positive(t("timeBank:gifts.validation.amountPositive"))
      .integer(t("timeBank:gifts.validation.amountInteger"))
      .required(t("timeBank:gifts.validation.amountRequired")),
    message: Yup.string()
      .trim()
      .max(70, t("timeBank:gifts.validation.messageMax"))
      .required(t("timeBank:gifts.validation.messageRequired")),
  });

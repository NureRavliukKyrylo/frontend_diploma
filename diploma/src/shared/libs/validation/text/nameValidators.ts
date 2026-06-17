import type { TFunction } from "i18next";
import * as Yup from "yup";

const NAME_REGEX = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/;

interface NameFieldOptions {
  min?: number;
  max?: number;
  invalidMessage?: string;
  requiredMessage?: string;
}

export const nameField = (
  { min = 2, max = 50, invalidMessage, requiredMessage }: NameFieldOptions = {},
  t?: TFunction,
) =>
  Yup.string()
    .matches(
      NAME_REGEX,
      invalidMessage ??
        t?.("common:validation.invalidName") ??
        "Please enter a valid name",
    )
    .min(
      min,
      t?.("common:validation.minChars", { count: min }) ??
        `Too short (min ${min} characters)`,
    )
    .max(
      max,
      t?.("common:validation.maxChars", { count: max }) ??
        `Too long (max ${max} characters)`,
    )
    .required(
      requiredMessage ??
        t?.("common:validation.required") ??
        "This field is required",
    );

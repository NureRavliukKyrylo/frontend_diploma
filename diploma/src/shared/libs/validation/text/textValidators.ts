import type { TFunction } from "i18next";
import * as Yup from "yup";

interface TextFieldOptions {
  min?: number;
  max?: number;
  required?: boolean;
  requiredMessage?: string;
}

export const textField = (
  { min, max, required = false, requiredMessage }: TextFieldOptions = {},
  t?: TFunction,
) => {
  let schema = Yup.string().nullable();

  if (min)
    schema = schema.min(
      min,
      t?.("common:validation.minChars", { count: min }) ??
        `Must contain at least ${min} characters`,
    );
  if (max)
    schema = schema.max(
      max,
      t?.("common:validation.maxChars", { count: max }) ??
        `Cannot exceed ${max} characters`,
    );
  if (required)
    schema = schema.required(
      requiredMessage ??
        t?.("common:validation.required") ??
        "This field is required",
    );

  return schema;
};

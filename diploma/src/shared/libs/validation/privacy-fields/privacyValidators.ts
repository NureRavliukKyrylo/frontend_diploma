import type { TFunction } from "i18next";
import * as Yup from "yup";

type PrivacyFieldType = "string" | "url" | "email";

export const withPrivacyField = (
  fieldName: string,
  type: PrivacyFieldType = "string",
  t?: TFunction,
) =>
  Yup.object({
    [fieldName]: Yup.string().when("visible", {
      is: true,
      then: (schema) =>
        validations[type](schema, t).required(
          t?.("common:validation.requiredWhenEnabled") ??
            "This field is required because the switch is enabled",
        ),
      otherwise: (schema) => validations[type](schema, t).optional(),
    }),
    visible: Yup.boolean().required(),
  });

const validations: Record<
  PrivacyFieldType,
  (schema: Yup.StringSchema, t?: TFunction) => Yup.StringSchema
> = {
  string: (schema) => schema,
  url: (schema, t) =>
    schema.url(
      t?.("common:validation.invalidUrl") ?? "Please enter a valid URL",
    ),
  email: (schema, t) =>
    schema.email(
      t?.("common:validation.invalidEmail") ?? "Please enter a valid email",
    ),
};

import * as Yup from "yup";

type PrivacyFieldType = "string" | "url" | "email";

const validations: Record<
  PrivacyFieldType,
  (schema: Yup.StringSchema) => Yup.StringSchema
> = {
  string: (schema) => schema,
  url: (schema) => schema.url("Please enter a valid URL"),
  email: (schema) => schema.email("Please enter a valid email"),
};

export const withPrivacyField = (
  fieldName: string,
  type: PrivacyFieldType = "string",
) =>
  Yup.object({
    [fieldName]: Yup.string().when("visible", {
      is: true,
      then: (schema) =>
        validations[type](schema).required(
          "This field is required because the switch is enabled",
        ),
      otherwise: (schema) => validations[type](schema).optional(),
    }),
    visible: Yup.boolean().required(),
  });

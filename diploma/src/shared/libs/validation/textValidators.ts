import * as Yup from "yup";

interface TextFieldOptions {
  min?: number;
  max?: number;
  required?: boolean;
  requiredMessage?: string;
}

export const textField = ({
  min,
  max,
  required = false,
  requiredMessage = "This field is required",
}: TextFieldOptions = {}) => {
  let schema = Yup.string().nullable();

  if (min) schema = schema.min(min, `Must contain at least ${min} characters`);
  if (max) schema = schema.max(max, `Cannot exceed ${max} characters`);
  if (required) schema = schema.required(requiredMessage);

  return schema;
};

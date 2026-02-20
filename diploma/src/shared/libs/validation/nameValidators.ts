import * as Yup from "yup";

const NAME_REGEX = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]+$/;

interface NameFieldOptions {
  min?: number;
  max?: number;
  invalidMessage?: string;
  requiredMessage?: string;
}

export const nameField = ({
  min = 2,
  max = 50,
  invalidMessage = "Please enter a valid name",
  requiredMessage = "This field is required",
}: NameFieldOptions = {}) =>
  Yup.string()
    .matches(NAME_REGEX, invalidMessage)
    .min(min, `Too short (min ${min} characters)`)
    .max(max, `Too long (max ${max} characters)`)
    .required(requiredMessage);

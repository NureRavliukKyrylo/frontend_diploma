import type { TFunction } from "i18next";
import * as Yup from "yup";

interface DateOptions {
  minValue?: number;
  maxValue?: number;
  minValueMessage?: string;
  maxValueMessage?: string;
}

export const dateField = (
  {
    minValue = 14,
    maxValue = 100,
    minValueMessage,
    maxValueMessage,
  }: DateOptions = {},
  t?: TFunction,
) => {
  const today = new Date();
  const min = new Date(
    today.getFullYear() - maxValue,
    today.getMonth(),
    today.getDate(),
  );
  const max = new Date(
    today.getFullYear() - minValue,
    today.getMonth(),
    today.getDate(),
  );

  return Yup.date()
    .nullable()
    .typeError(t?.("common:validation.invalidDate") ?? "Invalid date")
    .min(
      min,
      maxValueMessage ??
        t?.("common:validation.ageTooOld", { count: maxValue }) ??
        `Age cannot be more than ${maxValue} years`,
    )
    .max(
      max,
      minValueMessage ??
        t?.("common:validation.ageTooYoung", { count: minValue }) ??
        `You must be at least ${minValue} years old`,
    );
};

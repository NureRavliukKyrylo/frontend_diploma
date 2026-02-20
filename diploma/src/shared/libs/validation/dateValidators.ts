import * as Yup from "yup";

interface DateOptions {
  minValue?: number;
  maxValue?: number;
  minValueMessage?: string;
  maxValueMessage?: string;
}

export const dateField = ({
  minValue = 14,
  maxValue = 100,
  minValueMessage = `You must be at least ${14} years old`,
  maxValueMessage = `Age cannot be more than ${100} years`,
}: DateOptions = {}) => {
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
    .typeError("Invalid date")
    .min(min, maxValueMessage)
    .max(max, minValueMessage);
};

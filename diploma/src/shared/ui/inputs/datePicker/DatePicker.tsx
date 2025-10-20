import { DatePicker } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";

interface DatePickerInputProps {
  label?: string;
  name: string;
  value?: string | null;
  error?: string;
  touched?: boolean;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
  className?: string;
  showMonthAndYearPickers?: boolean;
}

export const DatePickerInput = ({
  label = "Select date",
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  className,
  showMonthAndYearPickers = false,
}: DatePickerInputProps) => {
  const parsedValue = (() => {
    if (!value) return undefined;
    try {
      return parseDate(value);
    } catch (e) {
      console.error("Invalid date format:", e);
      return undefined;
    }
  })();

  const isInvalid = touched && Boolean(error);

  return (
    <I18nProvider>
      <DatePicker
        name={name}
        label={label}
        value={parsedValue}
        isInvalid={isInvalid}
        showMonthAndYearPickers={showMonthAndYearPickers}
        onChange={(val) => onChange(val ? val.toString() : undefined)}
        onBlur={onBlur}
        errorMessage={touched ? error : ""}
        className={className || "w-full"}
        classNames={{
          inputWrapper: "bg-[rgba(217,217,217,0.5)] rounded-[10px]",
          input: `${isInvalid ? "text-[#ff0000]" : "text-gray-800"}`,
          selectorIcon: `${isInvalid ? "text-[#ff0000]" : "text-gray-600"}`,
          errorMessage: "text-[#ff0000]",
        }}
      />
    </I18nProvider>
  );
};

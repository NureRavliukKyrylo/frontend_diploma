import { DatePicker } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";

interface DatePickerInputProps {
  label?: string;
  name: string;
  value?: string | null;
  error?: string;
  submit?: boolean;
  onChange: (value: string | undefined) => void;
  showMonthAndYearPickers?: boolean;
}

export const DatePickerInput = ({
  label = "Select date",
  name,
  value,
  error,
  submit,
  onChange,
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

  const isInvalid = submit && Boolean(error);

  return (
    <>
      <I18nProvider>
        <DatePicker
          aria-label="date-picker"
          name={name}
          label={label}
          value={parsedValue}
          isInvalid={isInvalid}
          showMonthAndYearPickers={showMonthAndYearPickers}
          onChange={(val) => onChange(val ? val.toString() : undefined)}
          classNames={{
            base: "h-full rounded-[inherit] border border-[#ccc]",
            inputWrapper:
              " w-full h-full bg-[rgba(217,217,217,0.5)] rounded-[inherit]",
            input: `${
              isInvalid ? "text-[#ff0000]" : "text-gray-800"
            } text-[18px]`,
            selectorIcon: `${isInvalid ? "text-[#ff0000]" : "text-gray-600"}`,
            errorMessage: "text-[#ff0000]",
          }}
        />
      </I18nProvider>
      {submit && error && <div className="errorInput">{error}</div>}
    </>
  );
};

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
  classNames?: {
    base?: string;
    inputWrapper?: string;
    input?: string;
    selectorIcon?: string;
    errorMessage?: string;
  };
}

export const DatePickerInput = ({
  label = "",
  name,
  value,
  error,
  submit,
  onChange,
  showMonthAndYearPickers = false,
  classNames: externalClassNames,
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
            base: `h-full rounded-[inherit] border border-[#ccc] ${externalClassNames?.base ?? ""}`,
            inputWrapper: `w-full h-full rounded-[inherit] ${
              parsedValue
                ? "bg-white hover:bg-white"
                : "bg-[rgba(217,217,217,0.5)]"
            } ${externalClassNames?.inputWrapper ?? ""}`,
            input: `${isInvalid ? "text-[#ff0000]" : "text-gray-800"} text-[18px] ${externalClassNames?.input ?? ""}`,
            selectorIcon: `${isInvalid ? "text-[#ff0000]" : "text-gray-600"} ${externalClassNames?.selectorIcon ?? ""}`,
            errorMessage: `text-[#ff0000] ${externalClassNames?.errorMessage ?? ""}`,
          }}
        />
      </I18nProvider>
      {submit && error && <div className="errorInput">{error}</div>}
    </>
  );
};

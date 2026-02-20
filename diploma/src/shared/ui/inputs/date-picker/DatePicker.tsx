import { DatePicker } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import type { ComponentProps } from "react";

interface DatePickerInputProps extends Omit<
  ComponentProps<typeof DatePicker>,
  "onChange" | "value"
> {
  value?: string | null;
  error?: string;
  submit?: boolean;
  onChange?: (value: string | undefined) => void;
}

export const DatePickerInput = ({
  label = "",
  value,
  error,
  submit,
  onChange,
  showMonthAndYearPickers = false,
  classNames: externalClassNames,
  ...rest
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
          label={label}
          value={parsedValue}
          isInvalid={isInvalid}
          showMonthAndYearPickers={showMonthAndYearPickers}
          onChange={(val) => onChange?.(val ? val.toString() : undefined)}
          classNames={{
            base: `h-full rounded-[inherit] border border-[#ccc] ${externalClassNames?.base ?? ""}`,
            inputWrapper: `w-full h-full rounded-[inherit] ${
              parsedValue
                ? "bg-white hover:bg-white focus-within:hover:!bg-white group-data-[focus=true]:bg-white group-data-[focus=true]:hover:bg-white"
                : "bg-[rgba(217,217,217,0.5)]"
            } ${externalClassNames?.inputWrapper ?? ""}`,
            input: `${isInvalid ? "text-[#ff0000]" : "text-gray-800"} text-[18px] font-[500] ${externalClassNames?.input ?? ""}`,
            segment: `${isInvalid ? "text-[#ff0000]" : ""} ${externalClassNames?.segment ?? ""}`,
            selectorIcon: `${isInvalid ? "text-[#ff0000]" : "text-gray-600"} ${externalClassNames?.selectorIcon ?? ""}`,
            errorMessage: `text-[#ff0000] ${externalClassNames?.errorMessage ?? ""}`,
          }}
          {...rest}
        />
      </I18nProvider>
      {submit && error && <div className="errorInput">{error}</div>}
    </>
  );
};

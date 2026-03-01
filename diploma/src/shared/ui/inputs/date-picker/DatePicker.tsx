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
            base: `h-full rounded-[inherit] border ${
              isInvalid ? "border-[#DC2626]" : "border-[#ccc]"
            } ${externalClassNames?.base ?? ""}`,

            inputWrapper: `w-full h-full rounded-[inherit] shadow-none border-none ${
              isInvalid
                ? "!bg-red-50 data-[hover=true]:!bg-red-50 data-[focus=true]:!bg-red-50 data-[focus-within=true]:!bg-red-50"
                : parsedValue
                  ? "!bg-white data-[hover=true]:!bg-white data-[focus=true]:!bg-white data-[focus-within=true]:!bg-white"
                  : "!bg-[#f9f9f9] data-[hover=true]:!bg-[#f9f9f9] data-[focus=true]:!bg-[#f9f9f9]"
            } ${externalClassNames?.inputWrapper ?? ""}`,
            input: `${isInvalid ? "!text-[#DC2626]" : "text-gray-800"} text-[18px] font-[500] ${externalClassNames?.input ?? ""}`,
            segment: `${isInvalid ? "!text-[#DC2626]" : ""} ${externalClassNames?.segment ?? ""}`,
            selectorIcon: `${isInvalid ? "text-[#DC2626]" : "text-gray-600"} ${externalClassNames?.selectorIcon ?? ""}`,
            errorMessage: `text-[#DC2626] ${externalClassNames?.errorMessage ?? ""}`,
            calendar: "!overflow-hidden [&>*]:!overflow-hidden",
          }}
          calendarProps={{
            classNames: {
              base: "!overflow-hidden border-[#ccc]",
            },
          }}
          {...rest}
        />
      </I18nProvider>
      {submit && error && <div className="errorInput">{error}</div>}
    </>
  );
};

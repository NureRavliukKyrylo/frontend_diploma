import { useState, useRef } from "react";
import dayjs from "dayjs";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DatePickerInput } from "@shared/ui/inputs";
import { PortalMenu } from "@shared/ui/portal-menu";
import {
  getRangeDates,
  rangeOptions,
  type DateRangeState,
  type DateRangePreset,
} from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

const getDatePickerClassNames = () => ({
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInputWrapper,
  input: styles.datePickerInput,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerSelectorIcon,
});

interface DateRangeControlProps {
  range: DateRangeState;
  onChange: (range: DateRangeState) => void;
}

export const DateRangeControl = ({
  range,
  onChange,
}: DateRangeControlProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draftFrom, setDraftFrom] = useState(range.from);
  const [draftTo, setDraftTo] = useState(range.to);
  const activeLabel =
    rangeOptions.find((option) => option.value === range.preset)?.label ??
    "Date range";
  const customIsInvalid =
    draftFrom && draftTo ? dayjs(draftTo).isBefore(dayjs(draftFrom)) : false;

  const selectPreset = (preset: DateRangePreset) => {
    if (preset === "custom") {
      setDraftFrom(range.from);
      setDraftTo(range.to);
      onChange({ preset: "custom", from: range.from, to: range.to });
      return;
    }

    onChange({ preset, ...getRangeDates(preset) });
    setIsOpen(false);
  };

  const applyCustom = () => {
    if (customIsInvalid || !draftFrom || !draftTo) return;
    onChange({ preset: "custom", from: draftFrom, to: draftTo });
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.dateRangeButton}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CalendarDays size={17} aria-hidden="true" />
        {activeLabel}
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      <PortalMenu
        isOpen={isOpen}
        anchorRef={buttonRef}
        className={styles.rangePopover}
      >
        <div className={styles.rangeOptions}>
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                range.preset === option.value ? styles.rangeOptionActive : ""
              }
              onClick={() => selectPreset(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className={styles.customRangePanel}>
          <span className={styles.customRangeLabel}>Custom dates</span>
          <div className={styles.customRangeGrid}>
            <DatePickerInput
              showMonthAndYearPickers
              value={draftFrom}
              onChange={(value) => setDraftFrom(value ?? "")}
              classNames={getDatePickerClassNames()}
            />
            <DatePickerInput
              showMonthAndYearPickers
              value={draftTo}
              onChange={(value) => setDraftTo(value ?? "")}
              classNames={getDatePickerClassNames()}
            />
          </div>
          {customIsInvalid && (
            <span className={styles.rangeError}>
              End date must be after start date.
            </span>
          )}
          <button
            type="button"
            className={styles.applyRangeButton}
            disabled={customIsInvalid || !draftFrom || !draftTo}
            onClick={applyCustom}
          >
            Apply range
          </button>
        </div>
      </PortalMenu>
    </>
  );
};

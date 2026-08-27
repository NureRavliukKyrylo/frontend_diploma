import { parseDate } from "@internationalized/date";
import styles from "../CreateEventSteps.module.scss";

export const datePickerClassNames = {
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInput,
  input: styles.datePickerText,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerIcon,
  calendar: styles.datePickerCalendar,
  popoverContent: styles.datePickerPopover,
};

export const safelyParseDate = (value: string | null) => {
  if (!value) return undefined;

  try {
    return parseDate(value.split("T")[0]);
  } catch {
    return undefined;
  }
};

import { parseDateTime } from "@internationalized/date";
import styles from "../../CreateTaskDrawer.module.scss";

export const dateTimePickerClassNames = {
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInput,
  input: styles.datePickerText,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerIcon,
  calendar: styles.datePickerCalendar,
  popoverContent: styles.dateTimePopover,
};

export const safelyParseDateTime = (value: string | null) => {
  if (!value) return undefined;

  try {
    return parseDateTime(value);
  } catch {
    return undefined;
  }
};

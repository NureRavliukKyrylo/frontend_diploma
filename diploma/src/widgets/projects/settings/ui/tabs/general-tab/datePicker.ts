import { parseDate } from "@internationalized/date";
import styles from "../GeneralTab.module.scss";

export const datePickerClassNames = {
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInput,
  input: styles.datePickerText,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerIcon,
  calendar: styles.datePickerCalendar,
};

export const safelyParseDate = (value: string | null) =>
  value ? parseDate(value) : undefined;

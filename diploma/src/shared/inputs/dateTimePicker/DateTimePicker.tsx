import React from "react";
import { BaseInput } from "../baseInput/BaseInput";
import styles from "./DateTimePicker.module.scss";

interface DateTimePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  return (
    <BaseInput {...props} type="datetime-local" originalType="datetime">
      <button type="button" className={styles.iconSchedule}></button>
    </BaseInput>
  );
};

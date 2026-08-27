import { DatePickerInput } from "@shared/ui/inputs";
import type {
  TaskSettingsChangeHandler,
  TaskSettingsErrors,
  TaskSettingsValues,
} from "@features/task/edit-form";
import {
  dateTimePickerClassNames,
  safelyParseDateTime,
} from "./dateTimePicker";
import styles from "../../TaskEditSettings.module.scss";

interface BasicInfoSectionProps {
  values: TaskSettingsValues;
  errors: TaskSettingsErrors;
  minimumEndDate: ReturnType<typeof safelyParseDateTime>;
  onChange: TaskSettingsChangeHandler;
  onDateChange: (
    field: "startAt" | "endAt" | "reminderAtUtc",
    value: string | null,
  ) => void;
}

export const BasicInfoSection = ({
  values,
  errors,
  minimumEndDate,
  onChange,
  onDateChange,
}: BasicInfoSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Basic info</h2>
    <p className={styles.sectionDescription}>
      Update the task title, description, and schedule.
    </p>

    <label className={styles.field}>
      <span>Title</span>
      <input
        value={values.title}
        maxLength={200}
        placeholder="Task title"
        aria-invalid={Boolean(errors.title)}
        onChange={(event) => onChange("title", event.target.value)}
      />
      {errors.title ? <small>{errors.title}</small> : null}
    </label>

    <label className={`${styles.field} ${styles.fullField}`}>
      <span>Description</span>
      <textarea
        value={values.description}
        maxLength={1000}
        placeholder="Describe the work, expectations, and outcome."
        aria-invalid={Boolean(errors.description)}
        onChange={(event) => onChange("description", event.target.value)}
      />
      <div className={styles.hintRow}>
        {errors.description ? <small>{errors.description}</small> : <i />}
        <em>{values.description.length}/1000</em>
      </div>
    </label>

    <div className={styles.dateRow}>
      <label className={styles.dateField}>
        <span className={styles.fieldLabel}>Start date and time</span>
        <DatePickerInput
          aria-label="Task start date and time"
          value={values.startAt}
          granularity="minute"
          hourCycle={24}
          isInvalid={Boolean(errors.startAt)}
          onChange={(value) => onDateChange("startAt", value ?? null)}
          classNames={dateTimePickerClassNames}
        />
        {errors.startAt ? <small>{errors.startAt}</small> : null}
      </label>
      <label className={styles.dateField}>
        <span className={styles.fieldLabel}>End date and time</span>
        <DatePickerInput
          aria-label="Task end date and time"
          value={values.endAt}
          minValue={minimumEndDate}
          granularity="minute"
          hourCycle={24}
          isInvalid={Boolean(errors.endAt)}
          onChange={(value) => onDateChange("endAt", value ?? null)}
          classNames={dateTimePickerClassNames}
        />
        {errors.endAt ? <small>{errors.endAt}</small> : null}
      </label>
    </div>
  </section>
);

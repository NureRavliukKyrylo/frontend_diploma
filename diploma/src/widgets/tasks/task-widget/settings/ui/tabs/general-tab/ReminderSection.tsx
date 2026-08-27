import { DatePickerInput } from "@shared/ui/inputs";
import type {
  TaskSettingsChangeHandler,
  TaskSettingsErrors,
  TaskSettingsValues,
} from "@features/task/edit-form";
import { dateTimePickerClassNames } from "./dateTimePicker";
import styles from "../../TaskEditSettings.module.scss";

interface ReminderSectionProps {
  values: TaskSettingsValues;
  errors: TaskSettingsErrors;
  onChange: TaskSettingsChangeHandler;
  onDateChange: (
    field: "startAt" | "endAt" | "reminderAtUtc",
    value: string | null,
  ) => void;
}

const reminderOptions: Array<{
  value: TaskSettingsValues["reminderMode"];
  label: string;
}> = [
  { value: "none", label: "No reminder" },
  { value: "offset", label: "Minutes before end" },
  { value: "absolute", label: "At a specific time" },
];

export const ReminderSection = ({
  values,
  errors,
  onChange,
  onDateChange,
}: ReminderSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Reminder</h2>
    <p className={styles.sectionDescription}>
      Choose one reminder mode. Only the active mode is sent to the server.
    </p>

    <div className={styles.reminderOptions}>
      {reminderOptions.map((option) => {
        const selected = values.reminderMode === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`${styles.reminderOpt} ${
              selected ? styles.reminderOptActive : ""
            }`}
            onClick={() => onChange("reminderMode", option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>

    {values.reminderMode === "offset" ? (
      <label className={`${styles.field} ${styles.fullField}`}>
        <span>Minutes before end</span>
        <input
          type="number"
          min={0}
          value={values.reminderOffsetMinutes}
          placeholder="e.g. 30"
          aria-invalid={Boolean(errors.reminderOffsetMinutes)}
          onChange={(event) =>
            onChange("reminderOffsetMinutes", event.target.value)
          }
        />
        {errors.reminderOffsetMinutes ? (
          <small>{errors.reminderOffsetMinutes}</small>
        ) : null}
      </label>
    ) : null}

    {values.reminderMode === "absolute" ? (
      <label className={`${styles.dateField} ${styles.fullField}`}>
        <span className={styles.fieldLabel}>Reminder time</span>
        <DatePickerInput
          aria-label="Task reminder time"
          value={values.reminderAtUtc}
          granularity="minute"
          hourCycle={24}
          isInvalid={Boolean(errors.reminderAtUtc)}
          onChange={(value) => onDateChange("reminderAtUtc", value ?? null)}
          classNames={dateTimePickerClassNames}
        />
        {errors.reminderAtUtc ? <small>{errors.reminderAtUtc}</small> : null}
      </label>
    ) : null}
  </section>
);

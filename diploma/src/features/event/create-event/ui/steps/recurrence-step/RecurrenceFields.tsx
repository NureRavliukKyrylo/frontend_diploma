import { DatePickerInput } from "@shared/ui/inputs";
import type { CreateEventRecurrence } from "../../../api/createEventApi";
import type { CreateEventFormErrors } from "../../../model/useCreateEventForm";
import { datePickerClassNames, safelyParseDate } from "./datePicker";
import styles from "../CreateEventSteps.module.scss";

interface RecurrenceFieldsProps {
  recurrence: CreateEventRecurrence | null;
  errors: CreateEventFormErrors;
  minimumUntilDate: ReturnType<typeof safelyParseDate>;
  onChange: (patch: Partial<CreateEventRecurrence>) => void;
}

const FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
] as const;

export const RecurrenceFields = ({
  recurrence,
  errors,
  minimumUntilDate,
  onChange,
}: RecurrenceFieldsProps) => (
  <div className={styles.recurrenceFieldsInner}>
    <label className={styles.field}>
      <span className={styles.fieldName}>Frequency</span>
      <select
        className={styles.eventSelect}
        value={recurrence?.frequency ?? "weekly"}
        aria-invalid={Boolean(errors.recurrenceFrequency)}
        onChange={(event) =>
          onChange({
            frequency: event.target.value as CreateEventRecurrence["frequency"],
          })
        }
      >
        {FREQUENCY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.recurrenceFrequency ? (
        <span className={styles.formError}>{errors.recurrenceFrequency}</span>
      ) : null}
    </label>

    <div className={styles.recurrenceRow}>
      <label className={styles.field}>
        <span className={styles.fieldName}>Repeat every</span>
        <input
          className={styles.eventInput}
          type="number"
          min={1}
          value={recurrence?.interval ?? 1}
          aria-invalid={Boolean(errors.recurrenceInterval)}
          onChange={(event) =>
            onChange({ interval: Math.max(1, Number(event.target.value || 1)) })
          }
        />
        {errors.recurrenceInterval ? (
          <span className={styles.formError}>{errors.recurrenceInterval}</span>
        ) : null}
      </label>

      <div className={styles.dateField}>
        <span className={styles.fieldName}>Until</span>
        <DatePickerInput
          aria-label="Event recurrence end date"
          value={recurrence?.until ?? null}
          minValue={minimumUntilDate}
          classNames={datePickerClassNames}
          isInvalid={Boolean(errors.recurrenceUntil)}
          onChange={(value) => onChange({ until: value ?? "" })}
        />
        {errors.recurrenceUntil ? (
          <span className={styles.formError}>{errors.recurrenceUntil}</span>
        ) : null}
      </div>
    </div>

    <p className={styles.datetimeHint}>
      Maximum recurrence period is 1 year from start date.
    </p>
  </div>
);

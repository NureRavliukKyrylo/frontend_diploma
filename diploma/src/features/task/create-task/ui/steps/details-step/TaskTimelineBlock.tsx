import { DatePickerInput } from "@shared/ui/inputs";
import type {
  CreateTaskFormErrors,
  CreateTaskFormState,
} from "../../../model/useCreateTaskForm";
import {
  dateTimePickerClassNames,
  safelyParseDateTime,
} from "./dateTimePicker";
import styles from "../../CreateTaskDrawer.module.scss";

interface TaskTimelineBlockProps {
  values: Pick<CreateTaskFormState, "startAt" | "endAt">;
  errors: CreateTaskFormErrors;
  minimumEndDate: ReturnType<typeof safelyParseDateTime>;
  onChange: (
    field: "startAt" | "endAt" | "estimatedMinutes" | "points",
    value: string | number | null,
  ) => void;
}

export const TaskTimelineBlock = ({
  values,
  errors,
  minimumEndDate,
  onChange,
}: TaskTimelineBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.fieldLabel}>Timeline</h2>
    <p className={styles.fieldHint}>Tasks must be within a single calendar day.</p>

    <div className={styles.dateRow}>
      <div className={styles.dateField}>
        <span className={styles.dateFieldLabel}>Start</span>
        <DatePickerInput
          aria-label="Task start date and time"
          value={values.startAt}
          granularity="minute"
          hourCycle={24}
          classNames={dateTimePickerClassNames}
          isInvalid={Boolean(errors.startAt)}
          onChange={(value) => onChange("startAt", value ?? null)}
        />
        {errors.startAt ? (
          <span className={styles.fieldError}>{errors.startAt}</span>
        ) : null}
      </div>

      <div className={styles.dateField}>
        <span className={styles.dateFieldLabel}>End</span>
        <DatePickerInput
          aria-label="Task end date and time"
          value={values.endAt}
          minValue={minimumEndDate}
          granularity="minute"
          hourCycle={24}
          classNames={dateTimePickerClassNames}
          isInvalid={Boolean(errors.endAt)}
          onChange={(value) => onChange("endAt", value ?? null)}
        />
        {errors.endAt ? <span className={styles.fieldError}>{errors.endAt}</span> : null}
      </div>
    </div>

    <p className={styles.helperText}>
      Max duration is 24 hours. Must be within one calendar day.
    </p>
  </section>
);

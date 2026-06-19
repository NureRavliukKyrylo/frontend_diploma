import { parseDateTime } from "@internationalized/date";
import {
  type EventSettingsErrors,
  type EventSettingsLockState,
  type EventSettingsValues,
} from "@features/event";
import { DatePickerInput } from "@shared/ui/inputs";
import sectionStyles from "./GeneralTabShared.module.scss";
import styles from "./BasicInfoSection.module.scss";

interface BasicInfoSectionProps {
  values: EventSettingsValues;
  errors: EventSettingsErrors;
  lockState: EventSettingsLockState;
  onChange: <Field extends keyof EventSettingsValues>(
    field: Field,
    value: EventSettingsValues[Field],
  ) => void;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
}

const dateTimePickerClassNames = {
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInput,
  input: styles.datePickerText,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerIcon,
  calendar: styles.datePickerCalendar,
  popoverContent: styles.dateTimePopover,
};

const safelyParseDateTime = (value: string | null) => {
  if (!value) return undefined;

  try {
    return parseDateTime(value);
  } catch {
    return undefined;
  }
};

export const BasicInfoSection = ({
  values,
  errors,
  lockState,
  onChange,
  onDateChange,
}: BasicInfoSectionProps) => {
  const minimumEndDate = safelyParseDateTime(values.startAt);

  return (
    <section className={sectionStyles.section}>
      <h2 className={sectionStyles.sectionLabel}>Basic info</h2>
      <p className={sectionStyles.sectionDescription}>
        Keep the public event profile clear, searchable, and useful.
      </p>

      <label className={styles.field}>
        <span>Event title</span>
        <input
          value={values.title}
          maxLength={200}
          placeholder="Event title"
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
          placeholder="Describe what volunteers will do and why it matters."
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
          <span className={sectionStyles.fieldLabel}>Start date and time</span>
          <DatePickerInput
            aria-label="Event start date and time"
            value={values.startAt}
            granularity="minute"
            hourCycle={24}
            isDisabled={lockState.scheduleAndLocationLocked}
            isInvalid={Boolean(errors.startAt)}
            onChange={(value) => onDateChange("startAt", value ?? null)}
            classNames={dateTimePickerClassNames}
          />
          {errors.startAt ? <small>{errors.startAt}</small> : null}
        </label>
        <label className={styles.dateField}>
          <span className={sectionStyles.fieldLabel}>End date and time</span>
          <DatePickerInput
            aria-label="Event end date and time"
            value={values.endAt}
            minValue={minimumEndDate}
            granularity="minute"
            hourCycle={24}
            isDisabled={lockState.scheduleAndLocationLocked}
            isInvalid={Boolean(errors.endAt)}
            onChange={(value) => onDateChange("endAt", value ?? null)}
            classNames={dateTimePickerClassNames}
          />
          {errors.endAt ? <small>{errors.endAt}</small> : null}
        </label>
      </div>

      <label className={`${styles.field} ${styles.fullField}`}>
        <span>Type</span>
        <input
          value={values.type}
          placeholder="e.g. Workshop, cleanup, meetup"
          disabled={lockState.typeAndSkillsLocked}
          onChange={(event) => onChange("type", event.target.value)}
        />
      </label>
    </section>
  );
};

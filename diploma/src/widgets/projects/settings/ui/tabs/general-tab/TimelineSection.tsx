import type {
  ProjectSettingsErrors,
  ProjectSettingsValues,
} from "@features/project";
import { DatePickerInput } from "@shared/ui/inputs";
import { datePickerClassNames, safelyParseDate } from "./datePicker";
import styles from "../GeneralTab.module.scss";

interface TimelineSectionProps {
  values: ProjectSettingsValues;
  errors: ProjectSettingsErrors;
  minimumEndDate: ReturnType<typeof safelyParseDate>;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
}

export const TimelineSection = ({
  values,
  errors,
  minimumEndDate,
  onDateChange,
}: TimelineSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Timeline</h2>
    <p className={styles.sectionDescription}>
      Adjust the start and end dates shown on the project page.
    </p>

    <div className={styles.dateRow}>
      <label className={styles.dateField}>
        <span className={styles.fieldLabel}>Start date</span>
        <DatePickerInput
          aria-label="Project start date"
          value={values.startAt}
          onChange={(value) => onDateChange("startAt", value ?? null)}
          classNames={datePickerClassNames}
        />
        {errors.startAt ? <small>{errors.startAt}</small> : null}
      </label>
      <label className={styles.dateField}>
        <span className={styles.fieldLabel}>End date</span>
        <DatePickerInput
          aria-label="Project end date"
          value={values.endAt}
          minValue={minimumEndDate}
          onChange={(value) => onDateChange("endAt", value ?? null)}
          classNames={datePickerClassNames}
        />
        {errors.endAt ? <small>{errors.endAt}</small> : null}
      </label>
    </div>
  </section>
);

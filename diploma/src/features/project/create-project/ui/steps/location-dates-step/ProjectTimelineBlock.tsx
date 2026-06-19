import { DatePickerInput } from "@shared/ui/inputs";
import type { CreateProjectFormState } from "../../../model/useCreateProjectForm";
import { datePickerClassNames, safelyParseDate } from "./datePicker";
import styles from "../CreateProjectSteps.module.scss";

interface ProjectTimelineBlockProps {
  values: Pick<CreateProjectFormState, "startAt" | "endAt">;
  minimumEndDate: ReturnType<typeof safelyParseDate>;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
}

export const ProjectTimelineBlock = ({
  values,
  minimumEndDate,
  onDateChange,
}: ProjectTimelineBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.blockLabel}>Timeline</h2>
    <p className={styles.blockHint}>When does the project start and end?</p>

    <div className={styles.dateRow}>
      <div className={styles.dateField}>
        <span className={styles.fieldName}>Start date</span>
        <DatePickerInput
          aria-label="Project start date"
          value={values.startAt}
          onChange={(value) => onDateChange("startAt", value ?? null)}
          classNames={datePickerClassNames}
        />
      </div>
      <div className={styles.dateField}>
        <span className={styles.fieldName}>End date</span>
        <DatePickerInput
          aria-label="Project end date"
          value={values.endAt}
          minValue={minimumEndDate}
          onChange={(value) => onDateChange("endAt", value ?? null)}
          classNames={datePickerClassNames}
        />
      </div>
    </div>
  </section>
);

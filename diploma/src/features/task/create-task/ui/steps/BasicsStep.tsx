import type {
  CreateTaskFormErrors,
  CreateTaskFormState,
} from "../../model/useCreateTaskForm";
import styles from "../CreateTaskDrawer.module.scss";

interface BasicsStepProps {
  values: Pick<CreateTaskFormState, "title" | "description">;
  errors: CreateTaskFormErrors;
  onChange: (field: "title" | "description", value: string) => void;
}

const DESCRIPTION_LIMIT = 1000;

export const BasicsStep = ({ values, errors, onChange }: BasicsStepProps) => (
  <div className={styles.stepContent}>
    <div className={styles.card}>
      <div className={styles.cardDeco} />
      <section className={styles.fieldBlock}>
        <h2 className={styles.fieldLabel}>Task title</h2>
        <label className={styles.field}>
          <input
            className={styles.input}
            value={values.title}
            placeholder="e.g. Sort recyclable materials"
            aria-invalid={Boolean(errors.title)}
            onChange={(event) => onChange("title", event.target.value)}
          />
          {errors.title ? (
            <span className={styles.fieldError}>{errors.title}</span>
          ) : null}
        </label>
      </section>

      <section className={styles.fieldBlock}>
        <h2 className={styles.fieldLabel}>Description</h2>
        <p className={styles.fieldHint}>What exactly needs to be done?</p>
        <label className={styles.field}>
          <textarea
            className={styles.textarea}
            value={values.description}
            placeholder="Describe the task in detail..."
            onChange={(event) => onChange("description", event.target.value)}
          />
          <span className={styles.charCount}>
            {values.description.length} / {DESCRIPTION_LIMIT}
          </span>
          <span className={styles.helperText}>Optional but helpful</span>
        </label>
      </section>
    </div>
  </div>
);

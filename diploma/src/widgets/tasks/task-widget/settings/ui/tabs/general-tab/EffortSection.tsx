import type {
  TaskSettingsChangeHandler,
  TaskSettingsErrors,
  TaskSettingsValues,
} from "@features/task/edit-form";
import styles from "../../TaskEditSettings.module.scss";

interface EffortSectionProps {
  values: TaskSettingsValues;
  errors: TaskSettingsErrors;
  onChange: TaskSettingsChangeHandler;
}

export const EffortSection = ({
  values,
  errors,
  onChange,
}: EffortSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Effort &amp; points</h2>
    <p className={styles.sectionDescription}>
      Set task rewards and optional time logging.
    </p>

    <div className={styles.numberRow}>
      <label className={styles.field}>
        <span>Points</span>
        <input
          type="number"
          min={0}
          value={values.points}
          placeholder="0"
          aria-invalid={Boolean(errors.points)}
          onChange={(event) => onChange("points", event.target.value)}
        />
        {errors.points ? <small>{errors.points}</small> : null}
      </label>
      <label className={styles.field}>
        <span>Estimated minutes</span>
        <input
          type="number"
          min={0}
          value={values.estimatedMinutes}
          placeholder="Optional"
          aria-invalid={Boolean(errors.estimatedMinutes)}
          onChange={(event) =>
            onChange("estimatedMinutes", event.target.value)
          }
        />
        {errors.estimatedMinutes ? (
          <small>{errors.estimatedMinutes}</small>
        ) : null}
      </label>
    </div>

    <button
      type="button"
      className={styles.toggleRow}
      onClick={() => onChange("timeLoggingEnabled", !values.timeLoggingEnabled)}
    >
      <span className={styles.toggleCopy}>
        <strong>Enable time logging</strong>
        <small>Let volunteers log hours spent on this task.</small>
      </span>
      <span
        className={`${styles.switch} ${
          values.timeLoggingEnabled ? styles.switchActive : ""
        }`}
        aria-hidden="true"
      >
        <span />
      </span>
    </button>
  </section>
);

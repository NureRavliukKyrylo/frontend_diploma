import type { CreateTaskFormState } from "../../../model/useCreateTaskForm";
import styles from "../../CreateTaskDrawer.module.scss";

interface TaskEffortBlockProps {
  values: Pick<CreateTaskFormState, "estimatedMinutes" | "points">;
  onChange: (
    field: "startAt" | "endAt" | "estimatedMinutes" | "points",
    value: string | number | null,
  ) => void;
}

export const TaskEffortBlock = ({ values, onChange }: TaskEffortBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.fieldLabel}>Estimated time &amp; points</h2>
    <p className={styles.fieldHint}>Optional effort and reward details.</p>

    <div className={styles.estimateRow}>
      <label className={styles.field}>
        <span className={styles.dateFieldLabel}>Estimated minutes</span>
        <input
          className={styles.input}
          type="number"
          min={0}
          value={
            values.estimatedMinutes !== null
              ? String(values.estimatedMinutes)
              : ""
          }
          placeholder="e.g. 120"
          onChange={(event) =>
            onChange(
              "estimatedMinutes",
              event.target.value ? Number(event.target.value) : null,
            )
          }
        />
      </label>

      <label className={styles.field}>
        <span className={styles.dateFieldLabel}>Points</span>
        <input
          className={styles.input}
          type="number"
          min={0}
          value={values.points !== null ? String(values.points) : ""}
          placeholder="Optional"
          onChange={(event) =>
            onChange("points", event.target.value ? Number(event.target.value) : null)
          }
        />
      </label>
    </div>
  </section>
);

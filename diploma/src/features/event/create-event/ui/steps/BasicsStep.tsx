import type {
  CreateEventFormErrors,
  CreateEventFormState,
} from "../../model/useCreateEventForm";
import styles from "./CreateEventSteps.module.scss";

interface BasicsStepProps {
  values: Pick<CreateEventFormState, "title" | "description">;
  errors: CreateEventFormErrors;
  onChange: (field: "title" | "description", value: string) => void;
}

export const BasicsStep = ({ values, errors, onChange }: BasicsStepProps) => (
  <div className={styles.formCard}>
    <span className={styles.cardDeco} />
    <section className={styles.fieldBlock}>
      <h2 className={styles.blockLabel}>Event title</h2>
      <label className={styles.field}>
        <input
          className={styles.basicsInput}
          value={values.title}
          placeholder="e.g. Community Cleanup Day"
          aria-invalid={Boolean(errors.title)}
          onChange={(event) => onChange("title", event.target.value)}
        />
        {errors.title ? (
          <span className={styles.basicsError}>{errors.title}</span>
        ) : null}
      </label>
    </section>

    <section className={styles.fieldBlock}>
      <h2 className={styles.blockLabel}>Description</h2>
      <p className={styles.blockHint}>
        Describe what the event is about and who can join.
      </p>
      <label className={styles.field}>
        <textarea
          className={styles.basicsTextarea}
          value={values.description}
          placeholder="What will volunteers do? What impact will this event have?"
          onChange={(event) => onChange("description", event.target.value)}
        />
        <span className={styles.charCount}>
          {values.description.length} / 1000
        </span>
      </label>
    </section>
  </div>
);

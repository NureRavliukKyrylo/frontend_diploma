import type {
  CreateProjectFormErrors,
  CreateProjectFormState,
} from "../../model/useCreateProjectForm";
import styles from "./CreateProjectSteps.module.scss";

interface BasicsStepProps {
  values: Pick<CreateProjectFormState, "title" | "description">;
  errors: CreateProjectFormErrors;
  onChange: (field: "title" | "description", value: string) => void;
}

export const BasicsStep = ({ values, errors, onChange }: BasicsStepProps) => (
  <div className={styles.formCard}>
    <span className={styles.cardDeco} />
    <section className={styles.fieldBlock}>
      <h2 className={styles.blockLabel}>Project title</h2>
      <label className={styles.field}>
        <input
          className={styles.basicsInput}
          value={values.title}
          placeholder="e.g. Park Cleanup Initiative"
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
        Describe the goals, activities, and who can join.
      </p>
      <label className={styles.field}>
        <textarea
          className={styles.basicsTextarea}
          value={values.description}
          placeholder="What will volunteers do? What impact will this project have?"
          aria-invalid={Boolean(errors.description)}
          onChange={(event) => onChange("description", event.target.value)}
        />
        {errors.description ? (
          <span className={styles.basicsError}>{errors.description}</span>
        ) : null}
        <span className={styles.charCount}>
          {values.description.length} / 1000
        </span>
      </label>
    </section>
  </div>
);

import type {
  ProjectSettingsErrors,
  ProjectSettingsValues,
} from "@features/project";
import styles from "../GeneralTab.module.scss";

interface BasicInfoSectionProps {
  values: ProjectSettingsValues;
  errors: ProjectSettingsErrors;
  onChange: <Field extends keyof ProjectSettingsValues>(
    field: Field,
    value: ProjectSettingsValues[Field],
  ) => void;
}

export const BasicInfoSection = ({
  values,
  errors,
  onChange,
}: BasicInfoSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Basic info</h2>
    <p className={styles.sectionDescription}>
      Keep the public project profile clear, searchable, and useful.
    </p>

    <label className={styles.field}>
      <span>Project title</span>
      <input
        value={values.title}
        maxLength={200}
        placeholder="Project title"
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
        placeholder="Describe the project goals, scope, and volunteer impact."
        aria-invalid={Boolean(errors.description)}
        onChange={(event) => onChange("description", event.target.value)}
      />
      <div className={styles.hintRow}>
        {errors.description ? <small>{errors.description}</small> : <i />}
        <em>{values.description.length}/1000</em>
      </div>
    </label>
  </section>
);

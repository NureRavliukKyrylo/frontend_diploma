import { useTranslation } from "react-i18next";
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
}: BasicInfoSectionProps) => {
  const { t } = useTranslation("project");

  return (
    <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{t("settings.general.basicInfo")}</h2>
    <p className={styles.sectionDescription}>
      {t("settings.general.basicInfoText")}
    </p>

    <label className={styles.field}>
      <span>{t("settings.general.title")}</span>
      <input
        value={values.title}
        maxLength={200}
        placeholder={t("settings.general.titlePlaceholder")}
        aria-invalid={Boolean(errors.title)}
        onChange={(event) => onChange("title", event.target.value)}
      />
      {errors.title ? <small>{errors.title}</small> : null}
    </label>

    <label className={`${styles.field} ${styles.fullField}`}>
      <span>{t("settings.general.description")}</span>
      <textarea
        value={values.description}
        maxLength={1000}
        placeholder={t("settings.general.descriptionPlaceholder")}
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
};

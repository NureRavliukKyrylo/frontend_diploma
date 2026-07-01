import { Globe, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import type {
  OrganizationSettingsChangeHandler,
  OrganizationSettingsErrors,
  OrganizationSettingsValues,
} from "@features/organization/settings-form";
import styles from "../GeneralTab.module.scss";

interface BasicInfoSectionProps {
  values: OrganizationSettingsValues;
  errors: OrganizationSettingsErrors;
  descriptionLength: number;
  onChange: OrganizationSettingsChangeHandler;
}

export const BasicInfoSection = ({
  values,
  errors,
  descriptionLength,
  onChange,
}: BasicInfoSectionProps) => {
  const { t } = useTranslation("organizations");

  return (
    <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{t("settings.general.basicInfo")}</h2>
    <p className={styles.sectionDescription}>
      {t("settings.general.basicInfoText")}
    </p>

    <div className={styles.fieldsGrid}>
      <label className={styles.field}>
        <span>{t("settings.general.name")}</span>
        <input
          value={values.name}
          maxLength={200}
          placeholder={t("settings.general.namePlaceholder")}
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => onChange("name", event.target.value)}
        />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>

      <label className={styles.field}>
        <span>{t("settings.general.phone")}</span>
        <div className={styles.iconField}>
          <Phone size={16} />
          <input
            value={values.phoneNumber}
            placeholder={t("settings.general.phonePlaceholder")}
            onChange={(event) => onChange("phoneNumber", event.target.value)}
          />
        </div>
      </label>
    </div>

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
        <em>{descriptionLength}/1000</em>
      </div>
    </label>

    <div className={styles.contactGrid}>
      <label className={styles.field}>
        <span>{t("settings.general.contactEmail")}</span>
        <div className={styles.iconField}>
          <Mail size={16} />
          <input
            type="email"
            value={values.contactEmail}
            placeholder={t("settings.general.emailPlaceholder")}
            onChange={(event) => onChange("contactEmail", event.target.value)}
          />
        </div>
      </label>

      <label className={styles.field}>
        <span>{t("settings.general.website")}</span>
        <div className={styles.iconField}>
          <Globe size={16} />
          <input
            type="url"
            value={values.website}
            placeholder={t("settings.general.websitePlaceholder")}
            onChange={(event) => onChange("website", event.target.value)}
          />
        </div>
      </label>
    </div>
    </section>
  );
};

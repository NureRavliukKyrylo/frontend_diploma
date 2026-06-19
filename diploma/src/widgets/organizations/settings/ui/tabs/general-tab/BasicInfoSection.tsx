import { Globe, Mail, Phone } from "lucide-react";
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
}: BasicInfoSectionProps) => (
  <section className={styles.section}>
    <h2 className={styles.sectionLabel}>Basic info</h2>
    <p className={styles.sectionDescription}>
      Update the public details volunteers see before joining.
    </p>

    <div className={styles.fieldsGrid}>
      <label className={styles.field}>
        <span>Name</span>
        <input
          value={values.name}
          maxLength={200}
          placeholder="Organization name"
          aria-invalid={Boolean(errors.name)}
          onChange={(event) => onChange("name", event.target.value)}
        />
        {errors.name ? <small>{errors.name}</small> : null}
      </label>

      <label className={styles.field}>
        <span>Phone</span>
        <div className={styles.iconField}>
          <Phone size={16} />
          <input
            value={values.phoneNumber}
            placeholder="+380 00 000 0000"
            onChange={(event) => onChange("phoneNumber", event.target.value)}
          />
        </div>
      </label>
    </div>

    <label className={`${styles.field} ${styles.fullField}`}>
      <span>Description</span>
      <textarea
        value={values.description}
        maxLength={1000}
        placeholder="Describe what your organization does and how volunteers can help"
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
        <span>Contact email</span>
        <div className={styles.iconField}>
          <Mail size={16} />
          <input
            type="email"
            value={values.contactEmail}
            placeholder="example@gmail.com"
            onChange={(event) => onChange("contactEmail", event.target.value)}
          />
        </div>
      </label>

      <label className={styles.field}>
        <span>Website</span>
        <div className={styles.iconField}>
          <Globe size={16} />
          <input
            type="url"
            value={values.website}
            placeholder="https://yourwebsite.com"
            onChange={(event) => onChange("website", event.target.value)}
          />
        </div>
      </label>
    </div>
  </section>
);

import { Check, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../SettingsWidget.module.scss";

interface OrganizationSettingsTopBarProps {
  name: string;
  isSaving: boolean;
  onBack: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

export const OrganizationSettingsTopBar = ({
  name,
  isSaving,
  onBack,
  onDiscard,
  onSave,
}: OrganizationSettingsTopBarProps) => {
  const { t } = useTranslation("organizations");

  return (
    <div className={styles.topBar}>
    <div className={styles.titleGroup}>
      <button
        type="button"
        className={styles.backButton}
        aria-label={t("settings.topBar.back")}
        onClick={onBack}
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>
      <h1 className={styles.breadcrumbTitle}>
        <span className={styles.organizationName}>{name}</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.settingsLabel}>
          {t("settings.topBar.title")}
        </span>
      </h1>
    </div>

    <div className={styles.topActions}>
      <button type="button" className={styles.discardButton} onClick={onDiscard}>
        {t("settings.topBar.discard")}
      </button>
      <button
        type="button"
        className={styles.saveButton}
        disabled={isSaving}
        onClick={onSave}
      >
        <Check size={15} strokeWidth={3} />
        {isSaving
          ? t("settings.topBar.saving")
          : t("settings.topBar.save")}
      </button>
    </div>
    </div>
  );
};

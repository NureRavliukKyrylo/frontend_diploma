import { Check, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../SettingsWidget.module.scss";

interface EventSettingsTopBarProps {
  title: string;
  isSavePending: boolean;
  onBack: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

export const EventSettingsTopBar = ({
  title,
  isSavePending,
  onBack,
  onDiscard,
  onSave,
}: EventSettingsTopBarProps) => {
  const { t } = useTranslation("event");

  return (
    <div className={styles.topBar}>
    <button
      type="button"
      className={styles.backButton}
      aria-label={t("settings.topBar.back")}
      onClick={onBack}
    >
      <ChevronLeft size={20} strokeWidth={2.3} />
    </button>

    <div className={styles.titleGroup}>
      <div className={styles.breadcrumbTitle}>
        <span className={styles.eventName}>{title}</span>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.settingsLabel}>
          {t("settings.topBar.title")}
        </span>
      </div>
    </div>

    <div className={styles.topActions}>
      <button type="button" className={styles.discardButton} onClick={onDiscard}>
        {t("settings.topBar.discard")}
      </button>
      <button
        type="button"
        className={styles.saveButton}
        disabled={isSavePending}
        onClick={onSave}
      >
        <Check size={16} />
        {isSavePending
          ? t("settings.topBar.saving")
          : t("settings.topBar.save")}
      </button>
    </div>
    </div>
  );
};

import { Check, ChevronLeft } from "lucide-react";
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
}: EventSettingsTopBarProps) => (
  <div className={styles.topBar}>
    <button
      type="button"
      className={styles.backButton}
      aria-label="Back to event"
      onClick={onBack}
    >
      <ChevronLeft size={20} strokeWidth={2.3} />
    </button>

    <div className={styles.titleGroup}>
      <div className={styles.breadcrumbTitle}>
        <span className={styles.eventName}>{title}</span>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.settingsLabel}>settings</span>
      </div>
    </div>

    <div className={styles.topActions}>
      <button type="button" className={styles.discardButton} onClick={onDiscard}>
        Discard
      </button>
      <button
        type="button"
        className={styles.saveButton}
        disabled={isSavePending}
        onClick={onSave}
      >
        <Check size={16} />
        {isSavePending ? "Saving" : "Save changes"}
      </button>
    </div>
  </div>
);

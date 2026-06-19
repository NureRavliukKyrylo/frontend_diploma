import { Check, ChevronLeft } from "lucide-react";
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
}: OrganizationSettingsTopBarProps) => (
  <div className={styles.topBar}>
    <div className={styles.titleGroup}>
      <button
        type="button"
        className={styles.backButton}
        aria-label="Back to organization"
        onClick={onBack}
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>
      <h1 className={styles.breadcrumbTitle}>
        <span className={styles.organizationName}>{name}</span>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.settingsLabel}>settings</span>
      </h1>
    </div>

    <div className={styles.topActions}>
      <button type="button" className={styles.discardButton} onClick={onDiscard}>
        Discard
      </button>
      <button
        type="button"
        className={styles.saveButton}
        disabled={isSaving}
        onClick={onSave}
      >
        <Check size={15} strokeWidth={3} />
        {isSaving ? "Saving..." : "Save changes"}
      </button>
    </div>
  </div>
);

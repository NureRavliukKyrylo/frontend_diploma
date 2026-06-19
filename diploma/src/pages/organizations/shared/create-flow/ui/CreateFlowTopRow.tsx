import { ArrowLeft } from "lucide-react";

interface CreateFlowTopRowProps {
  organizationName: string;
  title: string;
  backLabel: string;
  onCancel: () => void;
  styles: Record<string, string>;
}

export const CreateFlowTopRow = ({
  organizationName,
  title,
  backLabel,
  onCancel,
  styles,
}: CreateFlowTopRowProps) => (
  <div className={styles.topRow}>
    <button
      type="button"
      className={styles.backBtn}
      aria-label={backLabel}
      onClick={onCancel}
    >
      <ArrowLeft size={18} strokeWidth={2.5} />
    </button>

    <div className={styles.crumb}>
      <span className={styles.crumbOrg}>{organizationName}</span>
      <span className={styles.crumbSep}>/</span>
      <span className={styles.crumbTitle}>{title}</span>
    </div>

    <button type="button" className={styles.cancelBtn} onClick={onCancel}>
      Cancel
    </button>
  </div>
);

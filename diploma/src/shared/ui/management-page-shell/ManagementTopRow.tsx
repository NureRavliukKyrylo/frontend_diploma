import { ArrowLeft } from "lucide-react";
import styles from "./ManagementTopRow.module.scss";

interface ManagementTopRowProps {
  title: string;
  contextName?: string;
  contextLabel?: string;
  onBack: () => void;
}

export const ManagementTopRow = ({
  title,
  contextName,
  contextLabel,
  onBack,
}: ManagementTopRowProps) => (
  <div className={styles.topRow}>
    <button
      type="button"
      className={styles.backBtn}
      aria-label="Go back"
      onClick={onBack}
    >
      <ArrowLeft size={18} strokeWidth={2.5} />
    </button>

    <div className={styles.crumb}>
      {contextName && (
        <>
          <span className={styles.crumbContext}>{contextName}</span>
          <span className={styles.crumbSep}>/</span>
        </>
      )}
      <span className={styles.crumbTitle}>{title}</span>
    </div>
    {contextLabel ? (
      <span className={styles.contextBadge}>{contextLabel}</span>
    ) : null}
  </div>
);

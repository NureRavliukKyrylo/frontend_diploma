import { ArrowLeft } from "lucide-react";
import styles from "./MembersTopRow.module.scss";

interface MembersTopRowProps {
  organizationName: string;
  onBack: () => void;
}

export const MembersTopRow = ({
  organizationName,
  onBack,
}: MembersTopRowProps) => (
  <div className={styles.topRow}>
    <button
      type="button"
      className={styles.backBtn}
      aria-label="Back to organization"
      onClick={onBack}
    >
      <ArrowLeft size={18} strokeWidth={2.5} />
    </button>

    <div className={styles.crumb}>
      <span className={styles.crumbOrg}>{organizationName}</span>
      <span className={styles.crumbSep}>/</span>
      <span className={styles.crumbTitle}>Members</span>
    </div>
  </div>
);

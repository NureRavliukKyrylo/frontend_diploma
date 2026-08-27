import type { LucideIcon } from "lucide-react";
import styles from "../AttendanceTab.module.scss";

interface AttendanceToggleRowProps {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export const AttendanceToggleRow = ({
  icon: Icon,
  title,
  description,
  checked,
  disabled = false,
  onToggle,
}: AttendanceToggleRowProps) => (
  <button
    type="button"
    className={`${styles.toggleRow} ${checked ? styles.toggleRowActive : ""} ${
      disabled ? styles.toggleRowDisabled : ""
    }`}
    disabled={disabled}
    aria-pressed={checked}
    onClick={onToggle}
  >
    <span className={styles.toggleIcon}>
      <Icon size={23} strokeWidth={2.2} />
    </span>
    <span className={styles.toggleCopy}>
      <strong>{title}</strong>
      <small>{description}</small>
    </span>
    <span className={styles.switchTrack} aria-hidden="true">
      <span />
    </span>
  </button>
);

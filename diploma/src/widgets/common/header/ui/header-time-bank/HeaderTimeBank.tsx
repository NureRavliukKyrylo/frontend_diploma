import { Hourglass } from "lucide-react";
import { formatTimeBankMinutes } from "../../lib/header";
import styles from "./HeaderTimeBank.module.scss";

interface HeaderTimeBankProps {
  availableMinutes?: number | null;
  onClick?: () => void;
}

export const HeaderTimeBank = ({
  availableMinutes,
  onClick,
}: HeaderTimeBankProps) => (
  <button
    type="button"
    className={styles.timeBankBlock}
    role="menuitem"
    onClick={onClick}
  >
    <span className={styles.timeBankIcon}>
      <Hourglass aria-hidden="true" strokeWidth={1.9} />
    </span>
    <div className={styles.timeBankText}>
      <span>Time Bank</span>
      <span>{formatTimeBankMinutes(availableMinutes)}</span>
    </div>
  </button>
);

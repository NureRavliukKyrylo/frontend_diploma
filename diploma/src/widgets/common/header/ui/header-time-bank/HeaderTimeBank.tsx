import { Hourglass } from "lucide-react";
import { formatTimeBankMinutes } from "../../lib/header";
import styles from "./HeaderTimeBank.module.scss";

interface HeaderTimeBankProps {
  availableMinutes?: number | null;
}

export const HeaderTimeBank = ({
  availableMinutes,
}: HeaderTimeBankProps) => (
  <div className={styles.timeBankBlock}>
    <span className={styles.timeBankIcon}>
      <Hourglass aria-hidden="true" strokeWidth={1.9} />
    </span>
    <div className={styles.timeBankText}>
      <span>Time Bank</span>
      <span>{formatTimeBankMinutes(availableMinutes)}</span>
    </div>
  </div>
);

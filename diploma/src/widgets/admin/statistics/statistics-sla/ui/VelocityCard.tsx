import { formatAdminHoursFromMinutes } from "@entities/admin";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

interface VelocityCardProps {
  earned: number;
  spent: number;
  adjusted: number;
  stuck: number;
}

export const VelocityCard = ({
  earned,
  spent,
  adjusted,
  stuck,
}: VelocityCardProps) => (
  <div className={styles.slaCard}>
    <strong className={styles.slaTitle}>Time Bank velocity</strong>
    <div className={styles.slaStatsRow}>
      <span>
        <strong>{formatAdminHoursFromMinutes(earned)}</strong>
        <em>Earned</em>
      </span>
      <span>
        <strong>{formatAdminHoursFromMinutes(spent)}</strong>
        <em>Spent</em>
      </span>
      <span>
        <strong>{formatAdminHoursFromMinutes(adjusted)}</strong>
        <em>Adjusted</em>
      </span>
    </div>
    {stuck > 0 && (
      <div className={styles.stuckAlert}>
        {formatAdminHoursFromMinutes(stuck)} stuck in reservations
      </div>
    )}
  </div>
);

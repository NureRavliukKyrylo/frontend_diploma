import type { QueueSlaStatistics } from "@entities/admin";
import { formatNumber } from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

interface SlaCardProps {
  title: string;
  data: QueueSlaStatistics;
}

export const SlaCard = ({ title, data }: SlaCardProps) => {
  const pending = data.pendingTotal;
  const under24 = Math.max(0, pending - data.olderThan24h);
  const between24And72 = Math.max(0, data.olderThan24h - data.olderThan72h);
  const over72 = Math.max(0, data.olderThan72h);
  const width = (value: number) => (pending ? (value / pending) * 100 : 0);

  return (
    <div className={styles.slaCard}>
      <strong className={styles.slaTitle}>{title}</strong>
      <div className={styles.slaStatsRow}>
        <span>
          <strong>{formatNumber(data.pendingTotal)}</strong>
          <em>Pending</em>
        </span>
        <span>
          <strong>{formatNumber(data.olderThan24h)}</strong>
          <em>24h+</em>
        </span>
        <span>
          <strong>{formatNumber(data.olderThan72h)}</strong>
          <em>72h+</em>
        </span>
      </div>
      <div className={styles.slaBarTrack}>
        {pending > 0 && (
          <>
            <span
              className={styles.slaBarGreen}
              style={{ width: `${width(under24)}%` }}
            />
            <span
              className={styles.slaBarAmber}
              style={{ width: `${width(between24And72)}%` }}
            />
            <span
              className={styles.slaBarRed}
              style={{ width: `${width(over72)}%` }}
            />
          </>
        )}
      </div>
      <div className={styles.slaMeta}>
        avg {Math.round(data.averageAgeHours)}h - max {Math.round(data.maxAgeHours)}h
      </div>
    </div>
  );
};

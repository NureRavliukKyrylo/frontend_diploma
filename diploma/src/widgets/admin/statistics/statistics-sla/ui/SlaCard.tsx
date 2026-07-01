import type { QueueSlaStatistics } from "@entities/admin";
import { formatNumber } from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { useTranslation } from "react-i18next";

interface SlaCardProps {
  title: string;
  data: QueueSlaStatistics;
}

export const SlaCard = ({ title, data }: SlaCardProps) => {
  const { t } = useTranslation("admin");
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
          <em>{t("statistics.sla.pending")}</em>
        </span>
        <span>
          <strong>{formatNumber(data.olderThan24h)}</strong>
          <em>{t("statistics.sla.over24")}</em>
        </span>
        <span>
          <strong>{formatNumber(data.olderThan72h)}</strong>
          <em>{t("statistics.sla.over72")}</em>
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
        {t("statistics.sla.average")} {Math.round(data.averageAgeHours)}
        {t("statistics.sla.hours")} - {t("statistics.sla.maximum")}{" "}
        {Math.round(data.maxAgeHours)}
        {t("statistics.sla.hours")}
      </div>
    </div>
  );
};

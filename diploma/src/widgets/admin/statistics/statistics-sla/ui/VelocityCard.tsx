import { formatAdminHoursFromMinutes } from "@entities/admin";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { useTranslation } from "react-i18next";

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
}: VelocityCardProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.slaCard}>
      <strong className={styles.slaTitle}>
        {t("statistics.velocity.title")}
      </strong>
      <div className={styles.slaStatsRow}>
        <span>
          <strong>{formatAdminHoursFromMinutes(earned)}</strong>
          <em>{t("statistics.velocity.earned")}</em>
        </span>
        <span>
          <strong>{formatAdminHoursFromMinutes(spent)}</strong>
          <em>{t("statistics.velocity.spent")}</em>
        </span>
        <span>
          <strong>{formatAdminHoursFromMinutes(adjusted)}</strong>
          <em>{t("statistics.velocity.adjusted")}</em>
        </span>
      </div>
      {stuck > 0 && (
        <div className={styles.stuckAlert}>
          {formatAdminHoursFromMinutes(stuck)} {t("statistics.velocity.stuck")}
        </div>
      )}
    </div>
  );
};

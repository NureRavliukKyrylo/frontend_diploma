import { Skeleton } from "@heroui/react";
import {
  clampPercent,
  formatNumber,
} from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { useTranslation } from "react-i18next";

interface ReliabilityCardProps {
  score: number;
  approved: number;
  rejected: number;
  isLoading: boolean;
  isError: boolean;
}

export const ReliabilityCard = ({
  score,
  approved,
  rejected,
  isLoading,
  isError,
}: ReliabilityCardProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.reliabilityCard}>
      <span className={styles.reliabilityDeco} aria-hidden="true" />
      <span className={styles.reliabilityLabel}>
        {t("statistics.reliability.title")}
      </span>
      {isLoading ? (
        <Skeleton className={styles.reliabilitySkeleton} />
      ) : isError ? (
        <div className={styles.darkCardState}>
          {t("statistics.reliability.unavailable")}
        </div>
      ) : (
        <>
          <div
            className={styles.reliabilityRing}
            style={{
              background: `conic-gradient(#4ade80 0% ${clampPercent(
                score,
              )}%, #2c2c2c ${clampPercent(score)}% 100%)`,
            }}
          >
            <div className={styles.reliabilityRingInner}>
              {Math.round(score)}%
            </div>
          </div>
          <div className={styles.reliabilityBreakdown}>
            <span>
              <strong className={styles.approvedValue}>
                {formatNumber(approved)}
              </strong>
              <em>{t("statistics.reliability.approved")}</em>
            </span>
            <span>
              <strong className={styles.rejectedValue}>
                {formatNumber(rejected)}
              </strong>
              <em>{t("statistics.reliability.rejected")}</em>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

import { Skeleton } from "@heroui/react";
import {
  clampPercent,
  type FunnelStage,
} from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { useTranslation } from "react-i18next";

interface FunnelCardProps {
  stages: FunnelStage[];
  isLoading: boolean;
  isError: boolean;
}

export const FunnelCard = ({ stages, isLoading, isError }: FunnelCardProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.funnelCard}>
      <div className={styles.cardHeader}>
        <strong className={styles.growthTitle}>
          {t("statistics.funnel.title")}
        </strong>
        <span className={styles.growthSubtitle}>
          {t("statistics.funnel.subtitle")}
        </span>
      </div>
      {isLoading ? (
        <Skeleton className={styles.funnelSkeleton} />
      ) : isError ? (
        <div className={styles.cardState}>
          {t("statistics.funnel.unavailable")}
        </div>
      ) : (
        stages.map((stage) => (
          <div key={stage.label} className={styles.funnelStage}>
            <div className={styles.funnelStageHeader}>
              <span>{stage.label}</span>
              <strong>{stage.value}</strong>
            </div>
            <div className={styles.funnelBarTrack}>
              <span
                className={styles.funnelBarFill}
                style={{
                  width: `${clampPercent(stage.width)}%`,
                  background: stage.color,
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

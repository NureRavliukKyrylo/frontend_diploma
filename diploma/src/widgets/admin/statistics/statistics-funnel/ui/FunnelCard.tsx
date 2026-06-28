import { Skeleton } from "@heroui/react";
import {
  clampPercent,
  type FunnelStage,
} from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

interface FunnelCardProps {
  stages: FunnelStage[];
  isLoading: boolean;
  isError: boolean;
}

export const FunnelCard = ({
  stages,
  isLoading,
  isError,
}: FunnelCardProps) => (
  <div className={styles.funnelCard}>
    <div className={styles.cardHeader}>
      <strong className={styles.growthTitle}>Invitation funnel</strong>
      <span className={styles.growthSubtitle}>Sent to completed</span>
    </div>
    {isLoading ? (
      <Skeleton className={styles.funnelSkeleton} />
    ) : isError ? (
      <div className={styles.cardState}>Funnel unavailable.</div>
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
              style={{ width: `${clampPercent(stage.width)}%`, background: stage.color }}
            />
          </div>
        </div>
      ))
    )}
  </div>
);

import type { AdvancedStatisticsDashboard } from "@entities/admin";
import { Skeleton } from "@heroui/react";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { SlaCard } from "./SlaCard";
import { VelocityCard } from "./VelocityCard";
import { useTranslation } from "react-i18next";

interface SlaInsightsRowProps {
  advanced?: AdvancedStatisticsDashboard;
  isLoading: boolean;
  isError: boolean;
}

const emptySla = {
  pendingTotal: 0,
  olderThan24h: 0,
  olderThan48h: 0,
  olderThan72h: 0,
  averageAgeHours: 0,
  maxAgeHours: 0,
};

export const SlaInsightsRow = ({
  advanced,
  isLoading,
  isError,
}: SlaInsightsRowProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.slaRow}>
      {isLoading ? (
        <>
          <Skeleton className={styles.slaSkeleton} />
          <Skeleton className={styles.slaSkeleton} />
          <Skeleton className={styles.slaSkeleton} />
        </>
      ) : isError ? (
        <div className={styles.wideState}>
          {t("statistics.sla.unavailable")}
        </div>
      ) : (
        <>
          <SlaCard
            title={t("statistics.sla.requests")}
            data={advanced?.requestSla ?? emptySla}
          />
          <SlaCard
            title={t("statistics.sla.reports")}
            data={advanced?.reportSla ?? emptySla}
          />
          <VelocityCard
            earned={advanced?.timeBankVelocity.earnedThisWeekMinutes ?? 0}
            spent={advanced?.timeBankVelocity.spentThisWeekMinutes ?? 0}
            adjusted={
              advanced?.timeBankVelocity.adminAdjustmentMinutesThisWeek ?? 0
            }
            stuck={advanced?.timeBankVelocity.stuckReservedMinutes ?? 0}
          />
        </>
      )}
    </div>
  );
};

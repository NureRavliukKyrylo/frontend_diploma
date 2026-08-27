import { formatAdminCount } from "@entities/admin";
import type { AdminUsersStyles } from "../../model/types";
import { SummaryMetric } from "../../ui/SummaryMetric";
import { useTranslation } from "react-i18next";

interface MetricState {
  value?: number;
  isLoading: boolean;
  isError: boolean;
}

interface UsersMetricCardsProps {
  styles: AdminUsersStyles;
  metrics: {
    totalUsers: MetricState;
    verifiedUsers: MetricState;
    unverifiedUsers: MetricState;
    activeBans: MetricState;
  };
}

export const UsersMetricCards = ({
  styles,
  metrics,
}: UsersMetricCardsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.metricsGrid}>
      <SummaryMetric
        styles={styles}
        label={t("users.metrics.total")}
        value={formatAdminCount(metrics.totalUsers.value)}
        tone="users"
        isLoading={metrics.totalUsers.isLoading}
        isError={metrics.totalUsers.isError}
      />
      <SummaryMetric
        styles={styles}
        label={t("users.metrics.verified")}
        value={formatAdminCount(metrics.verifiedUsers.value)}
        tone="verified"
        isLoading={metrics.verifiedUsers.isLoading}
        isError={metrics.verifiedUsers.isError}
      />
      <SummaryMetric
        styles={styles}
        label={t("users.metrics.unverified")}
        value={formatAdminCount(metrics.unverifiedUsers.value)}
        tone="unverified"
        isLoading={metrics.unverifiedUsers.isLoading}
        isError={metrics.unverifiedUsers.isError}
      />
      <SummaryMetric
        styles={styles}
        label={t("users.metrics.activeBans")}
        value={formatAdminCount(metrics.activeBans.value)}
        tone="banned"
        isLoading={metrics.activeBans.isLoading}
        isError={metrics.activeBans.isError}
      />
    </div>
  );
};

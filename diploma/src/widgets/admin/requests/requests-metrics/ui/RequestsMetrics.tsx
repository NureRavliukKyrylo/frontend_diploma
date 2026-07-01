import { formatAdminCount } from "@entities/admin";
import { MetricCard } from "@widgets/admin/requests/requests-metric-card/ui/MetricCard";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface MetricState {
  value?: number;
  isLoading: boolean;
  isError: boolean;
}

interface RequestsMetricsProps {
  pending: MetricState;
  resolvedToday: MetricState;
  inProgress: MetricState;
  priority: MetricState;
}

export const RequestsMetrics = ({
  pending,
  resolvedToday,
  inProgress,
  priority,
}: RequestsMetricsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.metricsGrid}>
      <MetricCard
        label={t("requests.metrics.pending")}
        value={formatAdminCount(pending.value)}
        tone="pending"
        isLoading={pending.isLoading}
        isError={pending.isError}
      />
      <MetricCard
        label={t("requests.metrics.resolvedToday")}
        value={formatAdminCount(resolvedToday.value)}
        tone="resolved"
        isLoading={resolvedToday.isLoading}
        isError={resolvedToday.isError}
      />
      <MetricCard
        label={t("requests.metrics.inProgress")}
        value={formatAdminCount(inProgress.value)}
        tone="progress"
        isLoading={inProgress.isLoading}
        isError={inProgress.isError}
      />
      <MetricCard
        label={t("requests.metrics.priorityBoosted")}
        value={formatAdminCount(priority.value)}
        tone="priority"
        isLoading={priority.isLoading}
        isError={priority.isError}
      />
    </div>
  );
};

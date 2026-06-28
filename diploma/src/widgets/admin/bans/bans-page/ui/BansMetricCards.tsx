import { formatAdminCount } from "@entities/admin";
import type { AdminBansStyles } from "../../model/types";
import { BanMetric } from "../../ui/BanMetric";

interface BansMetricCardsProps {
  styles: AdminBansStyles;
  activeCount?: number;
  expiringSoonCount: number;
  permanentCount: number;
  isLoading: boolean;
  isError: boolean;
}

export const BansMetricCards = ({
  styles,
  activeCount,
  expiringSoonCount,
  permanentCount,
  isLoading,
  isError,
}: BansMetricCardsProps) => (
  <div className={styles.metricsGrid}>
    <BanMetric
      styles={styles}
      label="Active bans"
      value={formatAdminCount(activeCount)}
      tone="active"
      isLoading={isLoading}
      isError={isError}
    />
    <BanMetric
      styles={styles}
      label="Expiring in 7 days"
      value={formatAdminCount(expiringSoonCount)}
      tone="soon"
      isLoading={isLoading}
      isError={isError}
    />
    <BanMetric
      styles={styles}
      label="Permanent"
      value={formatAdminCount(permanentCount)}
      tone="permanent"
      isLoading={isLoading}
      isError={isError}
    />
  </div>
);

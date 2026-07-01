import { formatAdminCount } from "@entities/admin";
import type { AdminBansStyles } from "../../model/types";
import { BanMetric } from "../../ui/BanMetric";
import { useTranslation } from "react-i18next";

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
}: BansMetricCardsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.metricsGrid}>
      <BanMetric
        styles={styles}
        label={t("bans.metrics.active")}
        value={formatAdminCount(activeCount)}
        tone="active"
        isLoading={isLoading}
        isError={isError}
      />
      <BanMetric
        styles={styles}
        label={t("bans.metrics.expiring")}
        value={formatAdminCount(expiringSoonCount)}
        tone="soon"
        isLoading={isLoading}
        isError={isError}
      />
      <BanMetric
        styles={styles}
        label={t("bans.metrics.permanent")}
        value={formatAdminCount(permanentCount)}
        tone="permanent"
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

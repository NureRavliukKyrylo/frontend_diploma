import {
  formatAdminHoursFromMinutes,
  type AdminTimeBankOverview,
} from "@entities/admin";
import { Skeleton } from "@heroui/react";
import type { TotalCardItem } from "@widgets/admin/statistics/statistics-config/libs/statisticsFormat";
import { SectionHeader } from "@widgets/admin/statistics/statistics-totals/ui/SectionHeader";
import { TotalCard } from "@widgets/admin/statistics/statistics-totals/ui/TotalCard";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { TimeBankWallets } from "./TimeBankWallets";
import { useTranslation } from "react-i18next";

interface TimeBankOverviewSectionProps {
  totals: TotalCardItem[];
  timeBank?: AdminTimeBankOverview;
  isLoading: boolean;
  isError: boolean;
}

export const TimeBankOverviewSection = ({
  totals,
  timeBank,
  isLoading,
  isError,
}: TimeBankOverviewSectionProps) => {
  const { t } = useTranslation("admin");

  return (
    <>
      <SectionHeader label={t("statistics.timeBank.overview")} />

      <div className={styles.timeBankTotalsGrid}>
        {totals.map((item) => (
          <TotalCard key={item.label} item={item} />
        ))}
      </div>

      <div className={styles.timeBankDetailRow}>
        <div className={styles.lifetimeCard}>
          <div className={styles.categoryTableHeader}>
            <strong className={styles.categoryTableTitle}>
              {t("statistics.timeBank.lifetime")}
            </strong>
            <span className={styles.categoryTableCaption}>
              {t("statistics.timeBank.source")}
            </span>
          </div>
          {isLoading ? (
            <Skeleton className={styles.lifetimeSkeleton} />
          ) : isError ? (
            <div className={styles.cardState}>
              {t("statistics.timeBank.unavailable")}
            </div>
          ) : (
            <div className={styles.lifetimeGrid}>
              <span>
                <strong>
                  {formatAdminHoursFromMinutes(
                    timeBank?.totalLifetimeEarnedMinutes,
                  )}
                </strong>
                <em>{t("statistics.timeBank.earned")}</em>
              </span>
              <span>
                <strong>
                  {formatAdminHoursFromMinutes(
                    timeBank?.totalLifetimeSpentMinutes,
                  )}
                </strong>
                <em>{t("statistics.timeBank.spent")}</em>
              </span>
              <span>
                <strong>
                  {formatAdminHoursFromMinutes(timeBank?.totalGiftedInMinutes)}
                </strong>
                <em>{t("statistics.timeBank.giftedIn")}</em>
              </span>
              <span>
                <strong>
                  {formatAdminHoursFromMinutes(timeBank?.totalGiftedOutMinutes)}
                </strong>
                <em>{t("statistics.timeBank.giftedOut")}</em>
              </span>
            </div>
          )}
        </div>

        {isLoading ? (
          <Skeleton className={styles.walletsSkeleton} />
        ) : isError ? (
          <div className={styles.walletsCard}>
            <div className={styles.cardState}>
              {t("statistics.timeBank.walletsUnavailable")}
            </div>
          </div>
        ) : (
          <TimeBankWallets users={timeBank?.topUsersByBalance ?? []} />
        )}
      </div>
    </>
  );
};

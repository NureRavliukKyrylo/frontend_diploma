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
}: TimeBankOverviewSectionProps) => (
  <>
    <SectionHeader label="Time Bank overview" />

    <div className={styles.timeBankTotalsGrid}>
      {totals.map((item) => (
        <TotalCard key={item.label} item={item} />
      ))}
    </div>

    <div className={styles.timeBankDetailRow}>
      <div className={styles.lifetimeCard}>
        <div className={styles.categoryTableHeader}>
          <strong className={styles.categoryTableTitle}>Lifetime totals</strong>
          <span className={styles.categoryTableCaption}>Purpose-built source</span>
        </div>
        {isLoading ? (
          <Skeleton className={styles.lifetimeSkeleton} />
        ) : isError ? (
          <div className={styles.cardState}>Time Bank totals unavailable.</div>
        ) : (
          <div className={styles.lifetimeGrid}>
            <span>
              <strong>
                {formatAdminHoursFromMinutes(timeBank?.totalLifetimeEarnedMinutes)}
              </strong>
              <em>Earned</em>
            </span>
            <span>
              <strong>
                {formatAdminHoursFromMinutes(timeBank?.totalLifetimeSpentMinutes)}
              </strong>
              <em>Spent</em>
            </span>
            <span>
              <strong>
                {formatAdminHoursFromMinutes(timeBank?.totalGiftedInMinutes)}
              </strong>
              <em>Gifted in</em>
            </span>
            <span>
              <strong>
                {formatAdminHoursFromMinutes(timeBank?.totalGiftedOutMinutes)}
              </strong>
              <em>Gifted out</em>
            </span>
          </div>
        )}
      </div>

      {isLoading ? (
        <Skeleton className={styles.walletsSkeleton} />
      ) : isError ? (
        <div className={styles.walletsCard}>
          <div className={styles.cardState}>Top wallets unavailable.</div>
        </div>
      ) : (
        <TimeBankWallets users={timeBank?.topUsersByBalance ?? []} />
      )}
    </div>
  </>
);

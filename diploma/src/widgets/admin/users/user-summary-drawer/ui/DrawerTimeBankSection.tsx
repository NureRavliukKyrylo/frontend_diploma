import {
  formatAdminHoursFromMinutes,
  type AdminUserTimeBankSummary,
} from "@entities/admin";
import { formatTimeAgo } from "@shared/libs/date";
import { CheckCircle2, ChevronDown, ChevronUp, Clock3, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AdminUsersStyles } from "../../model/types";
import { DrawerInfoCard } from "./DrawerInfoCard";

interface DrawerTimeBankSectionProps {
  styles: AdminUsersStyles;
  timeBank?: AdminUserTimeBankSummary;
  lifetimeExpanded: boolean;
  onToggleLifetime: () => void;
}

export const DrawerTimeBankSection = ({
  styles,
  timeBank,
  lifetimeExpanded,
  onToggleLifetime,
}: DrawerTimeBankSectionProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.drawerSection}>
      <div className={styles.drawerSectionTitle}>Time bank</div>
      <div className={styles.timeBankTopGrid}>
        <DrawerInfoCard
          styles={styles}
          icon={Wallet}
          value={formatAdminHoursFromMinutes(timeBank?.availableMinutes)}
          label="Available"
        />
        <DrawerInfoCard
          styles={styles}
          icon={Clock3}
          value={formatAdminHoursFromMinutes(timeBank?.reservedMinutes)}
          label="Reserved"
        />
        <DrawerInfoCard
          styles={styles}
          icon={CheckCircle2}
          value={timeBank?.currentLevelCode || "None"}
          label={
            timeBank?.currentLevelCode ? "Current level" : "No level reached yet"
          }
        />
      </div>

      <button
        type="button"
        className={styles.lifetimeToggle}
        onClick={onToggleLifetime}
      >
        <span>
          {lifetimeExpanded ? "Hide lifetime stats" : "Show lifetime stats"}
        </span>
        {lifetimeExpanded ? (
          <ChevronUp size={17} aria-hidden="true" />
        ) : (
          <ChevronDown size={17} aria-hidden="true" />
        )}
      </button>

      {lifetimeExpanded && (
        <div className={styles.lifetimeGrid}>
          <span>
            <small>Lifetime earned</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeEarnedMinutes)}
            </strong>
          </span>
          <span>
            <small>Lifetime spent</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeSpentMinutes)}
            </strong>
          </span>
          <span>
            <small>Lifetime gifted in</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeGiftedInMinutes)}
            </strong>
          </span>
          <span>
            <small>Lifetime gifted out</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeGiftedOutMinutes)}
            </strong>
          </span>
          <span className={styles.lifetimeFull}>
            <small>Last transaction</small>
            <strong>
              {timeBank?.lastTransactionAt
                ? formatTimeAgo(timeBank.lastTransactionAt, t)
                : "No transactions yet"}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
};

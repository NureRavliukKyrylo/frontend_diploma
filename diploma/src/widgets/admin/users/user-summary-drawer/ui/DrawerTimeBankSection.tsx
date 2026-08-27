import {
  formatAdminHoursFromMinutes,
  type AdminUserTimeBankSummary,
} from "@entities/admin";
import { formatTimeAgo } from "@shared/libs/date";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Wallet,
} from "lucide-react";
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
  const { t } = useTranslation(["admin", "common"]);

  return (
    <div className={styles.drawerSection}>
      <div className={styles.drawerSectionTitle}>
        {t("admin:users.drawer.timeBank")}
      </div>
      <div className={styles.timeBankTopGrid}>
        <DrawerInfoCard
          styles={styles}
          icon={Wallet}
          value={formatAdminHoursFromMinutes(timeBank?.availableMinutes)}
          label={t("admin:users.drawer.available")}
        />
        <DrawerInfoCard
          styles={styles}
          icon={Clock3}
          value={formatAdminHoursFromMinutes(timeBank?.reservedMinutes)}
          label={t("admin:users.drawer.reserved")}
        />
        <DrawerInfoCard
          styles={styles}
          icon={CheckCircle2}
          value={timeBank?.currentLevelCode || t("admin:users.drawer.none")}
          label={
            timeBank?.currentLevelCode
              ? t("admin:users.drawer.currentLevel")
              : t("admin:users.drawer.noLevel")
          }
        />
      </div>

      <button
        type="button"
        className={styles.lifetimeToggle}
        onClick={onToggleLifetime}
      >
        <span>
          {lifetimeExpanded
            ? t("admin:users.drawer.hideLifetime")
            : t("admin:users.drawer.showLifetime")}
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
            <small>{t("admin:users.drawer.lifetimeEarned")}</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeEarnedMinutes)}
            </strong>
          </span>
          <span>
            <small>{t("admin:users.drawer.lifetimeSpent")}</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeSpentMinutes)}
            </strong>
          </span>
          <span>
            <small>{t("admin:users.drawer.lifetimeGiftedIn")}</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeGiftedInMinutes)}
            </strong>
          </span>
          <span>
            <small>{t("admin:users.drawer.lifetimeGiftedOut")}</small>
            <strong>
              {formatAdminHoursFromMinutes(timeBank?.lifetimeGiftedOutMinutes)}
            </strong>
          </span>
          <span className={styles.lifetimeFull}>
            <small>{t("admin:users.drawer.lastTransaction")}</small>
            <strong>
              {timeBank?.lastTransactionAt
                ? formatTimeAgo(timeBank.lastTransactionAt, t)
                : t("admin:users.drawer.noTransactions")}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
};

import type { AdminUserListItem } from "@entities/admin";
import type { AdminUsersStyles } from "../model/types";
import { useTranslation } from "react-i18next";

interface UserStatusPillsProps {
  styles: AdminUsersStyles;
  user: AdminUserListItem;
  isBanned: boolean;
  showConnections?: boolean;
}

export const UserStatusPills = ({
  styles,
  user,
  isBanned,
  showConnections = true,
}: UserStatusPillsProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.pillRow}>
      <span
        className={`${styles.statusPill} ${
          user.emailVerified ? styles.statusPillActive : styles.statusPillMuted
        }`}
      >
        {user.emailVerified
          ? t("users.metrics.verified")
          : t("users.metrics.unverified")}
      </span>
      {showConnections && user.googleConnected && (
        <span className={`${styles.statusPill} ${styles.statusPillBlue}`}>
          {t("users.card.google")}
        </span>
      )}
      {showConnections && user.googleCalendarConnected && (
        <span className={`${styles.statusPill} ${styles.statusPillAmber}`}>
          {t("users.card.calendar")}
        </span>
      )}
      {isBanned && (
        <span className={`${styles.statusPill} ${styles.statusPillDanger}`}>
          {t("users.card.banned")}
        </span>
      )}
    </div>
  );
};

import type { AdminUserListItem } from "@entities/admin";
import type { AdminUsersStyles } from "../model/types";

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
}: UserStatusPillsProps) => (
  <div className={styles.pillRow}>
    <span
      className={`${styles.statusPill} ${
        user.emailVerified ? styles.statusPillActive : styles.statusPillMuted
      }`}
    >
      {user.emailVerified ? "Verified" : "Unverified"}
    </span>
    {showConnections && user.googleConnected && (
      <span className={`${styles.statusPill} ${styles.statusPillBlue}`}>
        Google
      </span>
    )}
    {showConnections && user.googleCalendarConnected && (
      <span className={`${styles.statusPill} ${styles.statusPillAmber}`}>
        Calendar
      </span>
    )}
    {isBanned && (
      <span className={`${styles.statusPill} ${styles.statusPillDanger}`}>
        Banned
      </span>
    )}
  </div>
);

import type { AdminUserListItem } from "@entities/admin";
import { Copy, Mail, X } from "lucide-react";
import { getUserName } from "../../lib/userDisplay";
import type { AdminUsersStyles } from "../../model/types";
import { UserAvatar } from "../../ui/UserAvatar";
import { UserStatusPills } from "../../ui/UserStatusPills";

interface DrawerHeaderProps {
  styles: AdminUsersStyles;
  user: AdminUserListItem;
  isBanned: boolean;
  copiedUserId: string | null;
  onCopyUserId: (userId: string) => void;
  onClose: () => void;
}

export const DrawerHeader = ({
  styles,
  user,
  isBanned,
  copiedUserId,
  onCopyUserId,
  onClose,
}: DrawerHeaderProps) => (
  <div className={styles.drawerHeader}>
    <div className={styles.drawerHeaderMain}>
      <div className={styles.drawerTitleRow}>
        <UserAvatar
          styles={styles}
          user={user}
          square
          className={styles.drawerAvatar}
        />
        <div className={styles.drawerIdentity}>
          <span className={styles.drawerName}>{getUserName(user)}</span>
          <UserStatusPills
            styles={styles}
            user={user}
            isBanned={isBanned}
            showConnections={false}
          />
        </div>
      </div>

      <div className={styles.drawerMetaBlock}>
        <span className={styles.drawerEmail}>
          <Mail size={14} aria-hidden="true" />
          {user.email}
        </span>
        <button
          type="button"
          className={styles.drawerUserId}
          onClick={() => onCopyUserId(user.userId)}
        >
          <Copy size={14} aria-hidden="true" />
          <span>User ID: {user.userId}</span>
          {copiedUserId === user.userId && <em>Copied!</em>}
        </button>
        <div className={styles.drawerConnectionPills}>
          {user.googleConnected && (
            <span className={`${styles.statusPill} ${styles.statusPillBlue}`}>
              Google
            </span>
          )}
          {user.googleCalendarConnected && (
            <span className={`${styles.statusPill} ${styles.statusPillAmber}`}>
              Calendar
            </span>
          )}
        </div>
      </div>
    </div>

    <button
      type="button"
      className={styles.drawerClose}
      onClick={onClose}
      aria-label="Close user summary"
    >
      <X size={20} aria-hidden="true" />
    </button>
  </div>
);

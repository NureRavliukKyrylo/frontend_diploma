import {
  formatAdminDate,
  formatAdminHoursFromMinutes,
  type AdminUserListItem,
} from "@entities/admin";
import { ExternalLink } from "lucide-react";
import type { AdminUsersStyles } from "../model/types";
import { getUserName } from "../lib/userDisplay";
import { UserAvatar } from "./UserAvatar";
import { UserStatusPills } from "./UserStatusPills";

interface UserCardProps {
  styles: AdminUsersStyles;
  user: AdminUserListItem;
  isBanned: boolean;
  onOpen: () => void;
}

export const UserCard = ({
  styles,
  user,
  isBanned,
  onOpen,
}: UserCardProps) => (
  <button type="button" className={styles.userCard} onClick={onOpen}>
    <span className={styles.cardDeco} aria-hidden="true" />
    <div className={styles.cardHeader}>
      <UserAvatar styles={styles} user={user} />
      <div className={styles.cardIdentity}>
        <span className={styles.cardName}>{getUserName(user)}</span>
        <span className={styles.cardEmail}>{user.email}</span>
      </div>
      <div className={styles.cardHeaderRight}>
        <span className={styles.rolePill}>{user.roleName || "User"}</span>
      </div>
    </div>

    <UserStatusPills styles={styles} user={user} isBanned={isBanned} />

    <div className={styles.cardStats}>
      <span>
        <strong>{formatAdminHoursFromMinutes(user.balanceMinutes)}</strong>
        <small>Time bank</small>
      </span>
      <span>
        <strong>{formatAdminDate(user.registeredAt)}</strong>
        <small>Joined</small>
      </span>
    </div>

    <div className={styles.cardFooter}>
      <span>{user.currentLevelCode || "No level"}</span>
      <span className={styles.openLink}>
        Summary
        <ExternalLink size={15} aria-hidden="true" />
      </span>
    </div>
  </button>
);

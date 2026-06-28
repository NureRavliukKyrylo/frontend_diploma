import type { AdminUserListItem } from "@entities/admin";
import type { AdminUsersStyles } from "../model/types";
import { getInitials, getRoleTone, getUserName } from "../lib/userDisplay";

interface UserAvatarProps {
  styles: AdminUsersStyles;
  user: AdminUserListItem;
  className?: string;
  square?: boolean;
}

export const UserAvatar = ({
  styles,
  user,
  className,
  square = false,
}: UserAvatarProps) => {
  const tone = getRoleTone(user.roleName);

  return (
    <span
      className={`${styles.avatar} ${styles[`avatar_${tone}`]} ${
        square ? styles.avatarSquare : ""
      } ${className ?? ""}`}
    >
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={getUserName(user)} />
      ) : (
        getInitials(user)
      )}
    </span>
  );
};

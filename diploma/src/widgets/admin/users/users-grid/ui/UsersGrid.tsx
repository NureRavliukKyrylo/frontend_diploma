import type { AdminUserListItem } from "@entities/admin";
import { Skeleton } from "@heroui/react";
import type { AdminUsersStyles } from "../../model/types";
import { UserCard } from "../../ui/UserCard";

interface UsersGridProps {
  styles: AdminUsersStyles;
  users: AdminUserListItem[];
  bannedUserIds: Set<string>;
  isLoading: boolean;
  isError: boolean;
  onOpenUser: (userId: string) => void;
}

export const UsersGrid = ({
  styles,
  users,
  bannedUserIds,
  isLoading,
  isError,
  onOpenUser,
}: UsersGridProps) => {
  if (isLoading) {
    return (
      <div className={styles.usersGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className={styles.userCardSkeleton} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.stateCard}>
        <strong>Users unavailable</strong>
        <span>The admin users endpoint could not be loaded.</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.stateCard}>
        <strong>No users found</strong>
        <span>Try a different search term or clear the current filters.</span>
      </div>
    );
  }

  return (
    <div className={styles.usersGrid}>
      {users.map((user) => (
        <UserCard
          styles={styles}
          key={user.userId || user.email}
          user={user}
          isBanned={bannedUserIds.has(user.userId)}
          onOpen={() => onOpenUser(user.userId)}
        />
      ))}
    </div>
  );
};

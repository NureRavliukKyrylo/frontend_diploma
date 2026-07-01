import type { AdminUserListItem } from "@entities/admin";
import { Skeleton } from "@heroui/react";
import type { AdminUsersStyles } from "../../model/types";
import { UserCard } from "../../ui/UserCard";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("admin");

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
        <strong>{t("users.states.errorTitle")}</strong>
        <span>{t("users.states.errorText")}</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.stateCard}>
        <strong>{t("users.states.emptyTitle")}</strong>
        <span>{t("users.states.emptyText")}</span>
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

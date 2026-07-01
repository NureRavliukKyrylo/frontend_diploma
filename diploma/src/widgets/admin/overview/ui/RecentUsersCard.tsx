import { formatAdminDate, type AdminUserListItem } from "@entities/admin";
import { Skeleton } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { AdminOverviewStyles } from "../model/types";
import { getAvatarTone, getInitials } from "../lib/overviewData";
import { useTranslation } from "react-i18next";

interface RecentUsersCardProps {
  styles: AdminOverviewStyles;
  users?: AdminUserListItem[];
  isLoading: boolean;
  isError: boolean;
}

export const RecentUsersCard = ({
  styles,
  users = [],
  isLoading,
  isError,
}: RecentUsersCardProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.recentCard}>
      <span className={styles.recentDeco} aria-hidden="true" />
      <div className={styles.recentHeader}>
        <span className={styles.recentTitle}>
          {t("overview.recentUsers.title")}
        </span>
        <Link to="/admin/users" className={styles.viewUsersLink}>
          <span>{t("overview.recentUsers.viewAll")}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className={styles.userTable}>
        <div className={styles.userTableHead}>
          <span>{t("overview.recentUsers.user")}</span>
          <span>{t("overview.recentUsers.joined")}</span>
          <span>{t("overview.recentUsers.status")}</span>
        </div>

        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.userRow}>
              <div className={styles.userCell}>
                <Skeleton className={styles.userAvatarSkeleton} />
                <Skeleton className={styles.userNameSkeleton} />
              </div>
              <Skeleton className={styles.userDateSkeleton} />
              <Skeleton className={styles.userStatusSkeleton} />
            </div>
          ))
        ) : isError ? (
          <div className={styles.recentState}>
            {t("overview.recentUsers.error")}
          </div>
        ) : users.length === 0 ? (
          <div className={styles.recentState}>
            {t("overview.recentUsers.empty")}
          </div>
        ) : (
          users.map((user, index) => {
            const isVerified = user.emailVerified;

            return (
              <div key={user.userId || user.email} className={styles.userRow}>
                <div className={styles.userCell}>
                  <span
                    className={`${styles.avatar} ${
                      styles[`avatar_${getAvatarTone(index)}`]
                    }`}
                  >
                    {getInitials(user)}
                  </span>
                  <span className={styles.userName}>
                    {user.displayName || user.email}
                  </span>
                </div>
                <span className={styles.joinedDate}>
                  {formatAdminDate(user.registeredAt)}
                </span>
                <span
                  className={`${styles.statusPill} ${
                    isVerified
                      ? styles.statusPillActive
                      : styles.statusPillSuspended
                  }`}
                >
                  {isVerified
                    ? t("users.metrics.verified")
                    : t("users.metrics.unverified")}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

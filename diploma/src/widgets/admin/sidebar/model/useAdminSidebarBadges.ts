import { adminDashboardQuery, formatAdminCount } from "@entities/admin";
import { notificationQuery } from "@entities/notification";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAdminSidebarBadges = () => {
  const { t } = useTranslation("admin");
  const usersQuery = useQuery(adminDashboardQuery.users());
  const bansQuery = useQuery(adminDashboardQuery.activeBans());
  const skillsQuery = useQuery(adminDashboardQuery.skills());
  const requestsQuery = useQuery(adminDashboardQuery.pendingRequests());
  const unreadCountQuery = useQuery(notificationQuery.unreadCount());
  const notificationLabel = unreadCountQuery.isLoading
    ? "..."
    : unreadCountQuery.isError
      ? "!"
      : formatAdminCount(unreadCountQuery.data?.count ?? 0);
  const notificationTooltip = unreadCountQuery.isLoading
    ? t("sidebar.loadingNotifications")
    : unreadCountQuery.isError
      ? t("sidebar.notificationsUnavailable")
      : t("sidebar.unreadNotifications", {
          count: unreadCountQuery.data?.count ?? 0,
        });

  return {
    notificationLabel,
    notificationTooltip,
    badgeLabels: {
      users: usersQuery.isLoading
        ? "..."
        : usersQuery.isError
          ? "!"
          : formatAdminCount(usersQuery.data?.totalCount ?? 0),
      bans: bansQuery.isLoading
        ? "..."
        : bansQuery.isError
          ? "!"
          : formatAdminCount(bansQuery.data?.length ?? 0),
      skills: skillsQuery.isLoading
        ? "..."
        : skillsQuery.isError
          ? "!"
          : formatAdminCount(skillsQuery.data?.pagination.totalCount ?? 0),
      requests: requestsQuery.isLoading
        ? "..."
        : requestsQuery.isError
          ? "!"
          : formatAdminCount(requestsQuery.data?.summary.totalOpen ?? 0),
    },
  };
};

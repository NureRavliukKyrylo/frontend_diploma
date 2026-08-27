import { adminDashboardQuery, type AdminUsersParams } from "@entities/admin";
import { useQuery } from "@tanstack/react-query";

export const useAdminUsersQueries = (
  params: AdminUsersParams,
  selectedUserId: string | null,
) => {
  const usersQuery = useQuery(adminDashboardQuery.users(params));
  const totalUsersQuery = useQuery(
    adminDashboardQuery.users({ OrderBy: "Newest", Page: 1, PageSize: 1 }),
  );
  const verifiedUsersQuery = useQuery(
    adminDashboardQuery.users({
      OrderBy: "Newest",
      Page: 1,
      PageSize: 1,
      EmailVerified: true,
    }),
  );
  const unverifiedUsersQuery = useQuery(
    adminDashboardQuery.users({
      OrderBy: "Newest",
      Page: 1,
      PageSize: 1,
      EmailVerified: false,
    }),
  );
  const bansQuery = useQuery(adminDashboardQuery.activeBans());
  const rolesQuery = useQuery(adminDashboardQuery.systemRoles());
  const summaryQueryOptions = adminDashboardQuery.userSummary(
    selectedUserId ?? "",
  );
  const summaryQuery = useQuery({
    ...summaryQueryOptions,
    enabled: Boolean(selectedUserId),
  });

  return {
    usersQuery,
    totalUsersQuery,
    verifiedUsersQuery,
    unverifiedUsersQuery,
    bansQuery,
    rolesQuery,
    summaryQuery,
  };
};

import { queryOptions } from "@tanstack/react-query";
import {
  getAdminActiveBans,
  getAdminOpenReports,
  getAdminAdvancedStatistics,
  getAdminPendingRequests,
  getAdminPlatformStatistics,
  getAdminSkills,
  getAdminSystemHealth,
  getAdminSystemRoles,
  getAdminTimeBankOverview,
  getAdminUserSummary,
  getAdminUsers,
} from "../../api/adminDashboardApi";
import type { AdminUsersParams } from "../types/adminDashboard";
import type { AdminSystemRolesParams } from "../types/adminDashboard";

export const adminDashboardKeys = {
  all: () => ["admin-dashboard"] as const,
  users: (params?: AdminUsersParams) =>
    [...adminDashboardKeys.all(), "users", params ?? {}] as const,
  userSummary: (userId: string) =>
    [...adminDashboardKeys.all(), "user-summary", userId] as const,
  openReports: () => [...adminDashboardKeys.all(), "open-reports"] as const,
  platformStatistics: () =>
    [...adminDashboardKeys.all(), "platform-statistics"] as const,
  advancedStatistics: (from?: string, to?: string) =>
    [
      ...adminDashboardKeys.all(),
      "advanced-statistics",
      from ?? null,
      to ?? null,
    ] as const,
  pendingRequests: () =>
    [...adminDashboardKeys.all(), "pending-requests"] as const,
  timeBankOverview: () =>
    [...adminDashboardKeys.all(), "time-bank-overview"] as const,
  systemHealth: () => [...adminDashboardKeys.all(), "system-health"] as const,
  activeBans: (take = 500) =>
    [...adminDashboardKeys.all(), "active-bans", take] as const,
  systemRoles: (params?: AdminSystemRolesParams) =>
    [...adminDashboardKeys.all(), "system-roles", params ?? {}] as const,
  skills: () => [...adminDashboardKeys.all(), "skills"] as const,
};

export const adminDashboardQuery = {
  users: (params?: AdminUsersParams) =>
    queryOptions({
      queryKey: adminDashboardKeys.users(params),
      queryFn: () => getAdminUsers(params),
      staleTime: 30_000,
    }),
  userSummary: (userId: string) =>
    queryOptions({
      queryKey: adminDashboardKeys.userSummary(userId),
      queryFn: () => getAdminUserSummary(userId),
      staleTime: 30_000,
    }),
  openReports: () =>
    queryOptions({
      queryKey: adminDashboardKeys.openReports(),
      queryFn: getAdminOpenReports,
      staleTime: 30_000,
    }),
  platformStatistics: () =>
    queryOptions({
      queryKey: adminDashboardKeys.platformStatistics(),
      queryFn: getAdminPlatformStatistics,
      staleTime: 60_000,
    }),
  advancedStatistics: (from?: string, to?: string) =>
    queryOptions({
      queryKey: adminDashboardKeys.advancedStatistics(from, to),
      queryFn: () => getAdminAdvancedStatistics(from, to),
      staleTime: 60_000,
    }),
  pendingRequests: () =>
    queryOptions({
      queryKey: adminDashboardKeys.pendingRequests(),
      queryFn: getAdminPendingRequests,
      staleTime: 30_000,
    }),
  timeBankOverview: () =>
    queryOptions({
      queryKey: adminDashboardKeys.timeBankOverview(),
      queryFn: getAdminTimeBankOverview,
      staleTime: 30_000,
    }),
  systemHealth: () =>
    queryOptions({
      queryKey: adminDashboardKeys.systemHealth(),
      queryFn: getAdminSystemHealth,
      staleTime: 30_000,
    }),
  activeBans: (take = 500) =>
    queryOptions({
      queryKey: adminDashboardKeys.activeBans(take),
      queryFn: () => getAdminActiveBans(take),
      staleTime: 30_000,
    }),
  systemRoles: (params?: AdminSystemRolesParams) =>
    queryOptions({
      queryKey: adminDashboardKeys.systemRoles(params),
      queryFn: () => getAdminSystemRoles(params),
      staleTime: 30_000,
    }),
  skills: () =>
    queryOptions({
      queryKey: adminDashboardKeys.skills(),
      queryFn: getAdminSkills,
      staleTime: 30_000,
    }),
};

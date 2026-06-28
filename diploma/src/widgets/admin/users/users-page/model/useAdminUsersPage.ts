import { useMemo } from "react";
import {
  buildUserParams,
  getBanUserId,
  getPageWindow,
  getRoleName,
  getRoleTone,
  getStatusFilter,
} from "../../lib/userDisplay";
import type {
  RoleFilter,
  StatusDropDownValue,
} from "../../model/types";
import { useAdminUsersDrawerState } from "./useAdminUsersDrawerState";
import { useAdminUsersQueries } from "./useAdminUsersQueries";
import { useAdminUsersSearchControls } from "./useAdminUsersSearchControls";

export const useAdminUsersPage = () => {
  const controls = useAdminUsersSearchControls();
  const drawerState = useAdminUsersDrawerState();
  const params = useMemo(() => buildUserParams(controls.search), [controls.search]);
  const queries = useAdminUsersQueries(params, drawerState.selectedUserId);

  const bannedUserIds = useMemo(
    () => new Set((queries.bansQuery.data ?? []).map(getBanUserId).filter(Boolean)),
    [queries.bansQuery.data],
  );

  const roleOptions = useMemo(
    () =>
      (queries.rolesQuery.data?.data ?? [])
        .map(getRoleName)
        .filter((role, index, roles) => role && roles.indexOf(role) === index),
    [queries.rolesQuery.data?.data],
  );

  const statusValue = getStatusFilter(controls.search);
  const roleFilterOptions = useMemo(
    () => [
      { value: "all" as const, label: "All roles" },
      ...roleOptions.map((role) => ({
        value: `role:${role}` as RoleFilter,
        label: role,
      })),
    ],
    [roleOptions],
  );
  const roleFilterValue = controls.search.RoleName
    ? (`role:${controls.search.RoleName}` as RoleFilter)
    : "all";
  const statusDropDownValue = `status:${statusValue}` as StatusDropDownValue;
  const users = queries.usersQuery.data?.items ?? [];
  const currentPage = queries.usersQuery.data?.page || controls.search.Page || 1;
  const totalPages = Math.max(queries.usersQuery.data?.totalPages || 1, 1);
  const pageWindow = getPageWindow(currentPage, totalPages);
  const selectedUser =
    queries.summaryQuery.data?.user ??
    users.find((user) => user.userId === drawerState.selectedUserId);
  const selectedUserIsBanned = drawerState.selectedUserId
    ? bannedUserIds.has(drawerState.selectedUserId)
    : false;
  const selectedUserTone = getRoleTone(selectedUser?.roleName);

  return {
    search: controls.search,
    searchInput: controls.searchInput,
    setSearchInput: controls.setSearchInput,
    updateSearch: controls.updateSearch,
    metrics: {
      totalUsers: {
        value: queries.totalUsersQuery.data?.totalCount,
        isLoading: queries.totalUsersQuery.isLoading,
        isError: queries.totalUsersQuery.isError,
      },
      verifiedUsers: {
        value: queries.verifiedUsersQuery.data?.totalCount,
        isLoading: queries.verifiedUsersQuery.isLoading,
        isError: queries.verifiedUsersQuery.isError,
      },
      unverifiedUsers: {
        value: queries.unverifiedUsersQuery.data?.totalCount,
        isLoading: queries.unverifiedUsersQuery.isLoading,
        isError: queries.unverifiedUsersQuery.isError,
      },
      activeBans: {
        value: queries.bansQuery.data?.length,
        isLoading: queries.bansQuery.isLoading,
        isError: queries.bansQuery.isError,
      },
    },
    toolbar: {
      roleFilterOptions,
      roleFilterValue,
      statusDropDownValue,
      onStatusChange: controls.handleStatusChange,
    },
    list: {
      users,
      isLoading: queries.usersQuery.isLoading,
      isError: queries.usersQuery.isError,
      totalCount: queries.usersQuery.data?.totalCount,
      bannedUserIds,
    },
    pagination: {
      currentPage,
      totalPages,
      pageWindow,
    },
    drawer: {
      selectedUserId: drawerState.selectedUserId,
      selectedUser,
      selectedUserIsBanned,
      selectedUserTone,
      isLoading:
        queries.summaryQuery.isLoading ||
        (Boolean(drawerState.selectedUserId) && !selectedUser),
      isError: queries.summaryQuery.isError,
      activity: queries.summaryQuery.data?.activity,
      timeBank: queries.summaryQuery.data?.timeBank,
      recentRequests: queries.summaryQuery.data?.recentRequests ?? [],
      copiedUserId: drawerState.copiedUserId,
      lifetimeExpanded: drawerState.lifetimeExpanded,
      showActivityCounters: drawerState.showActivityCounters,
      open: drawerState.setSelectedUserId,
      close: () => drawerState.setSelectedUserId(null),
      copyUserId: drawerState.copyUserId,
      setLifetimeExpanded: drawerState.setLifetimeExpanded,
      setShowActivityCounters: drawerState.setShowActivityCounters,
    },
    modals: {
      roleModalUser: drawerState.roleModalUser,
      messageUser: drawerState.messageUser,
      setRoleModalUser: drawerState.setRoleModalUser,
      setMessageUser: drawerState.setMessageUser,
    },
  };
};

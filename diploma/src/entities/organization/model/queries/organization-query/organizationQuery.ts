import {
  getContextRoleTemplates,
  getMyArchivedOrganizations,
  getMyOrganizationJoinRequests,
  getMyOrganizationLeaveRequests,
  getMyOrganizationMemberships,
  getMyOrganizations,
  getOrganizationById,
  getOrganizationEditAccess,
  getOrganizationMembers,
  getOrganizationPendingRequests,
  getOrganizationsList,
  getOrgContextRoles,
} from "../../../api";
import type {
  OrganizationMapParams,
  OrganizationPaginationParams,
  OrganizationSearchParams,
} from "../../../lib/search-schema/organizationSearchSchema";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const organizationKeys = {
  all: () => ["organizations"] as const,
  list: (params: OrganizationSearchParams) => [
    ...organizationKeys.all(),
    "list",
    params,
  ],
  infinite: (params: OrganizationPaginationParams) =>
    [...organizationKeys.list(params), "infinite"] as const,
  infiniteMy: (params: OrganizationPaginationParams) =>
    [...organizationKeys.list(params), "infinite-my"] as const,
  map: (params: OrganizationMapParams) =>
    [...organizationKeys.all(), "map", params] as const,
  my: (params: OrganizationSearchParams) =>
    [...organizationKeys.all(), "my", params] as const,
  archived: (params: OrganizationSearchParams) =>
    [...organizationKeys.all(), "archived", params] as const,
  memberships: () => [...organizationKeys.all(), "memberships"] as const,
  joinRequests: (id: string) =>
    [...organizationKeys.all(), "join-requests", id] as const,
  leaveRequests: (id: string) =>
    [...organizationKeys.all(), "leave-requests", id] as const,
  pendingJoinRequests: (id: string) =>
    [...organizationKeys.all(), "pending-join-requests", id] as const,
  pendingLeaveRequests: (id: string) =>
    [...organizationKeys.all(), "pending-leave-requests", id] as const,
  details: (id: string) => [...organizationKeys.all(), "details", id] as const,
  members: (id: string) => [...organizationKeys.all(), "members", id] as const,
  contextRoles: (id: string, includeArchived = false) =>
    [...organizationKeys.all(), "context-roles", id, includeArchived] as const,
  contextRoleTemplates: (entityType: string) =>
    [...organizationKeys.all(), "context-role-templates", entityType] as const,
  editAccess: (id: string) =>
    [...organizationKeys.all(), "edit-access", id] as const,
};

export const organizationQuery = {
  list: (params: OrganizationSearchParams) =>
    queryOptions({
      queryKey: organizationKeys.list({ ...params }),
      queryFn: () => getOrganizationsList({ ...params }),
      placeholderData: (prev) => prev,
    }),
  infinite: (params: OrganizationPaginationParams) =>
    infiniteQueryOptions({
      queryKey: organizationKeys.infinite(params),
      queryFn: ({ pageParam }) =>
        getOrganizationsList({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
  infiniteMy: (params: OrganizationPaginationParams) =>
    infiniteQueryOptions({
      queryKey: organizationKeys.infiniteMy(params),
      queryFn: ({ pageParam }) =>
        getOrganizationsList({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
  map: (params: OrganizationMapParams) =>
    queryOptions({
      queryKey: organizationKeys.map({ ...params }),
      queryFn: () => getOrganizationsList({ ...params }),
      placeholderData: (prev) => prev,
    }),
  my: (params: OrganizationSearchParams) =>
    queryOptions({
      queryKey: organizationKeys.my({ ...params }),
      queryFn: () => getMyOrganizations({ ...params }),
      placeholderData: (prev) => prev,
    }),
  archived: (params: OrganizationSearchParams) =>
    queryOptions({
      queryKey: organizationKeys.archived({ ...params }),
      queryFn: () => getMyArchivedOrganizations({ ...params }),
      placeholderData: (prev) => prev,
    }),
  memberships: () =>
    queryOptions({
      queryKey: organizationKeys.memberships(),
      queryFn: getMyOrganizationMemberships,
      placeholderData: (prev) => prev,
    }),
  joinRequests: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.joinRequests(id),
      queryFn: () => getMyOrganizationJoinRequests(id),
      enabled: Boolean(id),
      placeholderData: (prev) => prev,
    }),
  leaveRequests: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.leaveRequests(id),
      queryFn: () => getMyOrganizationLeaveRequests(id),
      enabled: Boolean(id),
      placeholderData: (prev) => prev,
    }),
  pendingJoinRequests: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.pendingJoinRequests(id),
      queryFn: () => getOrganizationPendingRequests(id, "join"),
      enabled: Boolean(id),
      placeholderData: (prev) => prev,
    }),
  pendingLeaveRequests: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.pendingLeaveRequests(id),
      queryFn: () => getOrganizationPendingRequests(id, "leave"),
      enabled: Boolean(id),
      placeholderData: (prev) => prev,
    }),
  byId: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.details(id),
      queryFn: () => getOrganizationById(id),
    }),
  members: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.members(id),
      queryFn: () => getOrganizationMembers(id),
      placeholderData: (prev) => prev,
    }),
  contextRoles: (id: string, includeArchived = false) =>
    queryOptions({
      queryKey: organizationKeys.contextRoles(id, includeArchived),
      queryFn: () => getOrgContextRoles(id, includeArchived),
      enabled: Boolean(id),
      placeholderData: (prev) => prev,
    }),
  contextRoleTemplates: (entityType: string) =>
    queryOptions({
      queryKey: organizationKeys.contextRoleTemplates(entityType),
      queryFn: () => getContextRoleTemplates(entityType),
      enabled: Boolean(entityType),
      placeholderData: (prev) => prev,
    }),
  editAccess: (id: string) =>
    queryOptions({
      queryKey: organizationKeys.editAccess(id),
      queryFn: () => getOrganizationEditAccess(id),
      enabled: Boolean(id),
    }),
};

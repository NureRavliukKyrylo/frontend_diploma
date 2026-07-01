import {
  adminRequestQuery,
  type AdminRequestsSearchParams,
  type AdminRequestStatusCode,
  type AdminRequestTypeCode,
} from "@entities/admin";
import { categoryQuery } from "@entities/category";
import { useQuery } from "@tanstack/react-query";
import {
  getPageWindow,
  getTabMatch,
} from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import {
  hiddenInviteTypes,
  tabOptions,
  type CategoryNameMap,
  type RequestsTab,
} from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import dayjs from "dayjs";
import { useMemo } from "react";

export const useRequestDataQueries = (search: AdminRequestsSearchParams) => {
  const listParams = useMemo(
    () => ({
      Status:
        search.Status === "all"
          ? undefined
          : (search.Status as AdminRequestStatusCode),
      Type:
        search.Type === "all"
          ? undefined
          : (search.Type as AdminRequestTypeCode),
      Search: search.Search || undefined,
      Page: search.Page,
      PageSize: search.PageSize,
    }),
    [search.Page, search.PageSize, search.Search, search.Status, search.Type],
  );

  const requestsQuery = useQuery(adminRequestQuery.list(listParams));
  const pendingQuery = useQuery(
    adminRequestQuery.list({ Status: 0, Page: 1, PageSize: 1 }),
  );
  const inProgressQuery = useQuery(
    adminRequestQuery.list({ Status: 1, Page: 1, PageSize: 1 }),
  );
  const resolvedTodayQuery = useQuery(
    adminRequestQuery.list({
      Status: 2,
      From: dayjs().startOf("day").toISOString(),
      Page: 1,
      PageSize: 1,
    }),
  );
  const priorityQuery = useQuery(
    adminRequestQuery.list({ Page: 1, PageSize: 100 }),
  );
  const categoriesQuery = useQuery(
    categoryQuery.list({ OrderBy: "NameAsc", Page: 1, PageSize: 100 }),
  );

  const categoryMap: CategoryNameMap = useMemo(
    () =>
      new Map(
        (categoriesQuery.data?.data ?? []).map((category) => [
          category.id,
          category.name,
        ]),
      ),
    [categoriesQuery.data?.data],
  );
  const rawRequests = requestsQuery.data?.data ?? [];
  const actionableRequests = useMemo(
    () =>
      rawRequests.filter((request) => !hiddenInviteTypes.has(request.typeName)),
    [rawRequests],
  );
  const filteredRequests = useMemo(
    () =>
      actionableRequests.filter((request) =>
        getTabMatch(request, search.Tab as RequestsTab),
      ),
    [actionableRequests, search.Tab],
  );
  const tabCounts = useMemo(
    () =>
      tabOptions.reduce<Record<RequestsTab, number>>(
        (acc, tab) => {
          acc[tab.value] = actionableRequests.filter((request) =>
            getTabMatch(request, tab.value),
          ).length;
          return acc;
        },
        {} as Record<RequestsTab, number>,
      ),
    [actionableRequests],
  );

  const pagination = requestsQuery.data?.pagination;
  const currentPage = pagination?.page || search.Page || 1;
  const totalPages = Math.max(pagination?.totalPages || 1, 1);
  const priorityCount =
    priorityQuery.data?.data.filter((request) => request.priorityBoostApplied)
      .length ?? 0;

  return {
    categoryMap,
    metrics: {
      pending: {
        value: pendingQuery.data?.pagination.totalCount,
        isLoading: pendingQuery.isLoading,
        isError: pendingQuery.isError,
      },
      resolvedToday: {
        value: resolvedTodayQuery.data?.pagination.totalCount,
        isLoading: resolvedTodayQuery.isLoading,
        isError: resolvedTodayQuery.isError,
      },
      inProgress: {
        value: inProgressQuery.data?.pagination.totalCount,
        isLoading: inProgressQuery.isLoading,
        isError: inProgressQuery.isError,
      },
      priority: {
        value: priorityCount,
        isLoading: priorityQuery.isLoading,
        isError: priorityQuery.isError,
      },
    },
    tabs: {
      counts: tabCounts,
      active: search.Tab as RequestsTab,
    },
    list: {
      requests: filteredRequests,
      isLoading: requestsQuery.isLoading,
      isError: requestsQuery.isError,
      totalCount: pagination?.totalCount ?? 0,
      currentPage,
      totalPages,
      pageWindow: getPageWindow(currentPage, totalPages),
    },
  };
};

import { getOrganizationsList } from "@entities/organization/api/organizationsListApi";
import type {
  OrganizationMapParams,
  OrganizationPaginationParams,
  OrganizationSearchParams,
} from "@entities/organization/libs/organizationSearchSchema";
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
  map: (params: OrganizationMapParams) => [
    [...organizationKeys.all(), "map", params] as const,
  ],
};

export const organizationQuery = {
  infinite: (params: OrganizationPaginationParams) =>
    infiniteQueryOptions({
      queryKey: organizationKeys.infinite(params),
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
};

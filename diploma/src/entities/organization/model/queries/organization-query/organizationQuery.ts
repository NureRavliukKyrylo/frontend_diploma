import { getOrganizationsList } from "../../../api";
import type {
  OrganizationSearchParams,
  OrganizationPaginationParams,
} from "../../../libs";
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
};

import {
  getOrganizationsList,
  type OrganizationSearchParams,
} from "@entities/organization/api/organizationsListApi";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const organizationKeys = {
  infinite: () => ["infinite"] as const,
};

export const organizationQuery = {
  infinite: (params: OrganizationSearchParams) =>
    infiniteQueryOptions({
      queryKey: organizationKeys.infinite(),
      queryFn: ({ pageParam }) =>
        getOrganizationsList({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};

import { useInfiniteQuery } from "@tanstack/react-query";
import { organizationQuery } from "../queries/organizationQuery";
import type { QueryResult } from "@shared/config/types";
import type { Organization } from "../types/Organization";
import type { OrganizationPaginationParams } from "@entities/organization/libs/organizationSearchSchema";

export const useOrganizationsFiltersInfiniteQuery =
  (params: OrganizationPaginationParams) => (): QueryResult<Organization> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery(organizationQuery.infiniteMy(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
  };

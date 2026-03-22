import { useInfiniteQuery } from "@tanstack/react-query";
import { organizationQuery } from "../queries";
import type { QueryResult } from "@shared/config/types";
import type { Organization } from "../types";
import type { OrganizationPaginationParams } from "../../libs";

export const useOrganizationsInfiniteQuery =
  (params: OrganizationPaginationParams) => (): QueryResult<Organization> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery(organizationQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
  };

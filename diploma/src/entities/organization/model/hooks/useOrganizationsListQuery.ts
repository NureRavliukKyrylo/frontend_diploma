import { organizationQuery } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Organization } from "../types";
import type { QueryResult } from "@shared/config/types";
import type { OrganizationSearchParams } from "../../libs";

export const useOrganizationsListQuery =
  (search: OrganizationSearchParams) => (): QueryResult<Organization> => {
    const { data } = useSuspenseQuery(organizationQuery.list(search));
    return { data: data.data };
  };

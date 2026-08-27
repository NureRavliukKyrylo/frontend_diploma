import { useQuery } from "@tanstack/react-query";
import { organizationTaskQuery } from "../queries/organizationTaskQuery";

interface UseOrganizationTasksQueryParams {
  organizationId: string;
  projectIds: string[];
}

export const useOrganizationTasksQuery = ({
  organizationId,
  projectIds,
}: UseOrganizationTasksQueryParams) =>
  useQuery({
    ...organizationTaskQuery.list(organizationId, projectIds),
    enabled: projectIds.length > 0,
  });

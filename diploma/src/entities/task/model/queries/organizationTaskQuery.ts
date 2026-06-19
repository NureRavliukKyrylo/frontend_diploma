import { queryOptions } from "@tanstack/react-query";
import {
  getOrganizationTasksFromBoards,
  getOrganizationTasksList,
} from "../../api/organization-tasks/organizationTasksApi";
import {
  getOrganizationTaskResponseItems,
  normalizeOrganizationTasks,
} from "../../lib/normalizeOrganizationTask";

export const organizationTaskKeys = {
  all: () => ["organization", "tasks"] as const,
  list: (organizationId: string, projectIds: string[]) =>
    [
      ...organizationTaskKeys.all(),
      organizationId,
      [...projectIds].sort().join(","),
    ] as const,
};

export const organizationTaskQuery = {
  list: (organizationId: string, projectIds: string[]) =>
    queryOptions({
      queryKey: organizationTaskKeys.list(organizationId, projectIds),
      queryFn: async () => {
        const listResponse = await getOrganizationTasksList(projectIds);
        const response =
          getOrganizationTaskResponseItems(listResponse).length > 0
            ? listResponse
            : await getOrganizationTasksFromBoards(projectIds);

        return normalizeOrganizationTasks(response, organizationId, projectIds);
      },
    }),
};

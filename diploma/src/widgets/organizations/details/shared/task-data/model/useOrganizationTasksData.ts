import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectQuery } from "@entities/project";
import { useOrganizationTasksQuery } from "@entities/task";

export const useOrganizationTasksData = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const { data: projectsResponse, isLoading: isProjectsLoading } = useQuery(
    projectQuery.list({
      OrganizationIds: [organizationId],
      Page: 1,
      PageSize: 100,
      OnlyActive: false,
      ShowJoined: false,
      OrderBy: "Default",
    }),
  );
  const projectIds = useMemo(
    () =>
      (projectsResponse?.data ?? [])
        .map((project) => project.id)
        .filter(Boolean),
    [projectsResponse?.data],
  );
  const { data: tasks = [], isLoading: isTasksLoading } =
    useOrganizationTasksQuery({
      organizationId,
      projectIds,
    });

  return {
    tasks,
    projectIds,
    isLoading: isProjectsLoading || (projectIds.length > 0 && isTasksLoading),
  };
};

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  projectQuery,
  type Project,
  type ProjectSearchParams,
} from "@entities/project";
import type { Organization } from "@entities/organization";
import {
  buildOrganizationProjectCards,
  buildOrganizationProjectsSummary,
} from "./helpers";

interface UseOrganizationProjectsPanelDataParams {
  organization: Organization;
  search: ProjectSearchParams;
}

export const useOrganizationProjectsPanelData = ({
  organization,
  search,
}: UseOrganizationProjectsPanelDataParams) => {
  const { data: allProjectsResponse, isLoading: isAllProjectsLoading } = useQuery(
    projectQuery.list({
      OrganizationIds: [organization.id],
      Page: 1,
      PageSize: 100,
      OnlyActive: false,
      ShowJoined: false,
      OrderBy: "Default",
    }),
  );

  const { data: filteredProjectsResponse, isLoading } = useQuery(
    projectQuery.list(search),
  );

  const allProjects = useMemo<Project[]>(
    () => allProjectsResponse?.data ?? [],
    [allProjectsResponse?.data],
  );

  const filteredProjects = useMemo<Project[]>(
    () => filteredProjectsResponse?.data ?? [],
    [filteredProjectsResponse?.data],
  );

  const projectCards = useMemo(
    () =>
      buildOrganizationProjectCards({
        organization,
        projects: allProjects,
      }),
    [allProjects, organization],
  );

  const summary = useMemo(
    () => buildOrganizationProjectsSummary(projectCards),
    [projectCards],
  );

  const visibleProjectCards = useMemo(
    () =>
      buildOrganizationProjectCards({
        organization,
        projects: filteredProjects,
      }),
    [filteredProjects, organization],
  );

  return {
    isLoading,
    isAllProjectsLoading,
    summary,
    visibleProjectCards,
  };
};

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation("organizations");
  const intlLocale =
    i18n.language === "uk" || i18n.language === "ua" ? "uk-UA" : "en-US";
  const { data: allProjectsResponse, isLoading: isAllProjectsLoading } =
    useQuery(
      projectQuery.list({
        OrganizationIds: [organization.id],
        Page: 1,
        PageSize: 100,
        IncludeArchived: false,
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
        t,
        locale: intlLocale,
      }),
    [allProjects, intlLocale, organization, t],
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
        t,
        locale: intlLocale,
      }),
    [filteredProjects, intlLocale, organization, t],
  );

  return {
    isLoading,
    isAllProjectsLoading,
    summary,
    visibleProjectCards,
  };
};

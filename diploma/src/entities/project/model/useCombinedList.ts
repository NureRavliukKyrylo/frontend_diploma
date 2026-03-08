import { useSuspenseQueries } from "@tanstack/react-query";
import { projectQuery } from "@entities/project";
import { organizationQuery } from "@entities/organization";
import type { Project, ProjectSearchParams } from "@entities/project";
import type {
  Organization,
  OrganizationSearchParams,
} from "@entities/organization";

type CombinedItem =
  | { type: "project"; data: Project }
  | { type: "organization"; data: Organization };

interface UseCombinedListParams {
  projectParams: ProjectSearchParams;
  organizationParams: OrganizationSearchParams;
}

export const useCombinedList = ({
  projectParams,
  organizationParams,
}: UseCombinedListParams) => {
  const [projectsResult, organizationsResult] = useSuspenseQueries({
    queries: [
      projectQuery.list(projectParams),
      organizationQuery.list(organizationParams),
    ],
  });

  const combined: CombinedItem[] = [
    ...(projectsResult.data?.data ?? []).map((data) => ({
      type: "project" as const,
      data,
    })),
    ...(organizationsResult.data?.data ?? []).map((data) => ({
      type: "organization" as const,
      data,
    })),
  ];

  const totalPages = Math.max(
    projectsResult.data?.pagination.totalPages ?? 1,
    organizationsResult.data?.pagination.totalPages ?? 1,
  );

  return {
    items: combined,
    totalPages,
  };
};

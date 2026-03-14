import type { ProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProjectsQueryResult } from "../types/ProjectQueryResult";

export const useProjectsListQuery =
  (search: ProjectSearchParams) => (): ProjectsQueryResult => {
    const { data } = useSuspenseQuery(projectQuery.list(search));
    return { data: data.data };
  };

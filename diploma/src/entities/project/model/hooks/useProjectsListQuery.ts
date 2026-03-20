import type { ProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project } from "../types/Project";
import type { QueryResult } from "@shared/config/types";

export const useProjectsListQuery =
  (search: ProjectSearchParams) => (): QueryResult<Project> => {
    const { data } = useSuspenseQuery(projectQuery.list(search));
    return { data: data.data };
  };

import type { ProjectRequestParams } from "@entities/project/libs";
import { projectQuery } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project } from "../types";
import type { QueryResult } from "@shared/config/types";

export const useProjectsListQuery =
  (search: ProjectRequestParams) => (): QueryResult<Project> => {
    const { data } = useSuspenseQuery(projectQuery.list(search));
    return { data: data.data };
  };

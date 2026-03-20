import type { ProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { QueryResult } from "@shared/config/types";
import type { Project } from "../types/Project";

export const useMyProjectsListQuery =
  (search: ProjectSearchParams) => (): QueryResult<Project> => {
    const { data } = useSuspenseQuery(projectQuery.my(search));
    return { data: data.data };
  };

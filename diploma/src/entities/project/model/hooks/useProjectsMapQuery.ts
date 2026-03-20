import type { MapProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project } from "../types/Project";
import type { QueryResult } from "@shared/config/types";

export const useProjectsMapQuery =
  (search: MapProjectSearchParams) => (): QueryResult<Project> => {
    const { data } = useSuspenseQuery(projectQuery.map(search));
    return { data: data.data };
  };

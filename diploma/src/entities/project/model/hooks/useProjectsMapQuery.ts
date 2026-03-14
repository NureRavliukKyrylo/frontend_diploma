import type { MapProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ProjectsQueryResult } from "../types/ProjectQueryResult";

export const useProjectsMapQuery =
  (search: MapProjectSearchParams) => (): ProjectsQueryResult => {
    const { data } = useSuspenseQuery(projectQuery.map(search));
    return { data: data.data };
  };

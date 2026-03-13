import type { MapProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useProjectsMapQuery = (search: MapProjectSearchParams) => () => {
  const { data } = useSuspenseQuery(projectQuery.map(search));
  return { data };
};

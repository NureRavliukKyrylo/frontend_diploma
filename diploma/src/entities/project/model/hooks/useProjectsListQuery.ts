import type { ProjectSearchParams } from "@entities/project/libs";
import { projectQuery } from "../queries/projectQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useProjectsListQuery = (search: ProjectSearchParams) => () => {
  const { data } = useSuspenseQuery(projectQuery.list(search));
  return { data };
};

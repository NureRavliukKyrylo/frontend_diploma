import type { ProjectSearchParams } from "@entities/project";
import { getListProjects } from "../../api/projectsApi";
import { queryOptions } from "@tanstack/react-query";
import { type MapProjectSearchParams } from "@entities/project/libs/projectsSearchSchema";

export const projectKeys = {
  all: () => ["projects"] as const,
  list: (params: ProjectSearchParams) =>
    [...projectKeys.all(), "list", params] as const,
  map: (params: MapProjectSearchParams) =>
    [...projectKeys.all(), "map", params] as const,
};

export const projectQuery = {
  list: (params: ProjectSearchParams) =>
    queryOptions({
      queryKey: projectKeys.list({ ...params }),
      queryFn: () => getListProjects({ ...params }),
      placeholderData: (prev) => prev,
    }),
  map: (params: MapProjectSearchParams) =>
    queryOptions({
      queryKey: projectKeys.map({ ...params }),
      queryFn: () => getListProjects({ ...params }),
      placeholderData: (prev) => prev,
    }),
};

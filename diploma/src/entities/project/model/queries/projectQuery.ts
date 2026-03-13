import type {
  MapProjectSearchParams,
  ProjectSearchParams,
} from "@entities/project/libs";
import { getListProjects } from "@entities/project/api";
import { queryOptions } from "@tanstack/react-query";

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

import {
  getListProjects,
  type ProjectSearchParams,
} from "../../api/projectsApi";
import { queryOptions } from "@tanstack/react-query";

export const projectKeys = {
  all: () => ["projects"] as const,
  list: (params: ProjectSearchParams) =>
    [...projectKeys.all(), "list", params] as const,
};

export const projectQuery = {
  list: (params: ProjectSearchParams) =>
    queryOptions({
      queryKey: projectKeys.list(params),
      queryFn: () => getListProjects(params),
      placeholderData: (prev) => prev,
    }),
};

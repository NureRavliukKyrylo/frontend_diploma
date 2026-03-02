import type { ProjectSearchParams } from "../../libs/projectsSearchSchema";
import {
  getListProjects,
  type ProjectQueryParams,
} from "../../api/projectsApi";
import { queryOptions } from "@tanstack/react-query";

export const projectKeys = {
  all: () => ["projects"] as const,
  list: (params: ProjectQueryParams) =>
    [...projectKeys.all(), "list", params] as const,
};

export const projectQuery = {
  list: (params: ProjectSearchParams, pageSize?: number) =>
    queryOptions({
      queryKey: projectKeys.list({ ...params, pageSize }),
      queryFn: () => getListProjects({ ...params, pageSize }),
      placeholderData: (prev) => prev,
    }),
};

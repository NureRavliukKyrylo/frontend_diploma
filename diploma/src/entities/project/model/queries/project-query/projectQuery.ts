import type {
  MapProjectSearchParams,
  MyProjectsSearchParams,
  ProjectPaginationParams,
  ProjectSearchParams,
} from "../../../libs";
import { getListProjects, getMyProjects, getProjectId } from "../../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const projectKeys = {
  all: () => ["projects"] as const,
  list: (params: ProjectSearchParams) =>
    [...projectKeys.all(), "list", params] as const,
  id: (id: string) => [...projectKeys.all(), "id", id],
  mys: () => [...projectKeys.all(), "my"] as const,
  my: (params: MyProjectsSearchParams) =>
    [...projectKeys.mys(), params] as const,
  map: (params: MapProjectSearchParams) =>
    [...projectKeys.all(), "map", params] as const,
  infinite: (params: ProjectPaginationParams) =>
    [...projectKeys.list(params), "infinite"] as const,
};

export const projectQuery = {
  list: (params: ProjectSearchParams) =>
    queryOptions({
      queryKey: projectKeys.list({ ...params }),
      queryFn: () => getListProjects({ ...params }),
      placeholderData: (prev) => prev,
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: projectKeys.id(id),
      queryFn: () => getProjectId(id),
      select: (res) => res.data,
    }),
  my: (params: MyProjectsSearchParams) =>
    queryOptions({
      queryKey: projectKeys.my({ ...params }),
      queryFn: () => getMyProjects({ ...params }),
      placeholderData: (prev) => prev,
    }),
  map: (params: MapProjectSearchParams) =>
    queryOptions({
      queryKey: projectKeys.map({ ...params }),
      queryFn: () => getListProjects({ ...params }),
      placeholderData: (prev) => prev,
    }),
  infinite: (params: ProjectPaginationParams) =>
    infiniteQueryOptions({
      queryKey: projectKeys.infinite(params),
      queryFn: ({ pageParam }) =>
        getListProjects({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};

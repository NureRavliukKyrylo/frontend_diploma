import type {
  MapProjectRequestParams,
  MyProjectsRequestParams,
  ProjectPaginationParams,
  ProjectRequestParams,
} from "../../../libs";
import { getListProjects, getMyProjects, getProjectId } from "../../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const projectKeys = {
  all: () => ["projects"] as const,
  list: (params: ProjectRequestParams) =>
    [...projectKeys.all(), "list", params] as const,
  id: (id: string) => [...projectKeys.all(), "id", id],
  mys: () => [...projectKeys.all(), "my"] as const,
  my: (params: MyProjectsRequestParams) =>
    [...projectKeys.mys(), params] as const,
  map: (params: MapProjectRequestParams) =>
    [...projectKeys.all(), "map", params] as const,
  infinite: (params: ProjectPaginationParams) =>
    [...projectKeys.list(params), "infinite"] as const,
};

export const projectQuery = {
  list: (params: ProjectRequestParams) =>
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
  my: (params: MyProjectsRequestParams) =>
    queryOptions({
      queryKey: projectKeys.my({ ...params }),
      queryFn: () => getMyProjects({ ...params }),
      placeholderData: (prev) => prev,
    }),
  map: (params: MapProjectRequestParams) =>
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

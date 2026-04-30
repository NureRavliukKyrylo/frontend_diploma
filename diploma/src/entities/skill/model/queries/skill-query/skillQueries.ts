import type { SkillsProfileSearchParams } from "@entities/user";
import { getMySkills, getSkills } from "../../../api";
import type {
  SkillsInfiniteSearchParams,
  SkillsSearchParams,
} from "../../../libs";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const skillKeys = {
  all: () => ["skills"] as const,
  list: (params: SkillsSearchParams) =>
    [...skillKeys.all(), "list", params] as const,
  myAll: () => [...skillKeys.all(), "my"] as const,
  my: (params: SkillsProfileSearchParams) => [...skillKeys.all(), "my", params],
  infinite: (params: SkillsInfiniteSearchParams) =>
    [...skillKeys.list(params), "infinite"] as const,
};

export const skillsQuery = {
  list: (params: SkillsSearchParams) =>
    queryOptions({
      queryKey: skillKeys.list(params),
      queryFn: () => getSkills({ ...params }),
    }),
  my: (params: SkillsProfileSearchParams) =>
    queryOptions({
      queryKey: skillKeys.my(params),
      queryFn: () => getMySkills({ ...params }),
    }),
  infinite: (params: SkillsInfiniteSearchParams) =>
    infiniteQueryOptions({
      queryKey: skillKeys.infinite(params),
      queryFn: ({ pageParam }) => getSkills({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};

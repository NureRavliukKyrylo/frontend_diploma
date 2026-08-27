import type { SkillsProfileSearchParams } from "@entities/user";
import {
  getAdminSkills,
  getMySkills,
  getSkillVolunteers,
  getSkills,
} from "../../../api";
import type {
  SkillsInfiniteSearchParams,
  SkillsSearchParams,
} from "../../../libs";
import type { SkillsListParams } from "../../types";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const skillKeys = {
  all: () => ["skills"] as const,
  list: (params: SkillsSearchParams) =>
    [...skillKeys.all(), "list", params] as const,
  adminList: (params: SkillsListParams) =>
    [...skillKeys.all(), "admin-list", params] as const,
  volunteers: (skillId: string) =>
    [...skillKeys.all(), "volunteers", skillId] as const,
  myAll: () => [...skillKeys.all(), "my"] as const,
  my: (params: SkillsProfileSearchParams) => [...skillKeys.all(), "my", params],
  infinite: (params: SkillsInfiniteSearchParams) =>
    [...skillKeys.list(params), "infinite"] as const,
};

export const skillQuery = {
  list: (params: SkillsListParams) =>
    queryOptions({
      queryKey: skillKeys.adminList(params),
      queryFn: () => getAdminSkills(params),
      staleTime: 30_000,
    }),
  volunteers: (skillId: string) =>
    queryOptions({
      queryKey: skillKeys.volunteers(skillId),
      queryFn: () => getSkillVolunteers(skillId),
      staleTime: 30_000,
      enabled: Boolean(skillId),
    }),
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

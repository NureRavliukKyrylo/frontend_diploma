import { getMySkills, getSkills } from "@entities/skill/api";
import type { SkillsSearchParams } from "@entities/skill/libs";
import { queryOptions } from "@tanstack/react-query";

export const skillKeys = {
  all: () => ["skills"] as const,
  list: (params: SkillsSearchParams) =>
    [...skillKeys.all(), "list", params] as const,
  my: () => [...skillKeys.all(), "my"],
};

export const skillsQuery = {
  list: (params: SkillsSearchParams) =>
    queryOptions({
      queryKey: skillKeys.all(),
      queryFn: () => getSkills({ ...params }),
    }),
  my: () =>
    queryOptions({
      queryKey: skillKeys.my(),
      queryFn: () => getMySkills(),
    }),
};

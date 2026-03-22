import { getMySkills, getSkills } from "../../../api";
import type {
  SkillsProfileSearchParams,
  SkillsSearchParams,
} from "../../../libs";
import { queryOptions } from "@tanstack/react-query";

export const skillKeys = {
  all: () => ["skills"] as const,
  list: (params: SkillsSearchParams) =>
    [...skillKeys.all(), "list", params] as const,
  myAll: () => [...skillKeys.all(), "my"] as const,
  my: (params?: SkillsProfileSearchParams) => [
    ...skillKeys.all(),
    "my",
    params,
  ],
};

export const skillsQuery = {
  list: (params: SkillsSearchParams) =>
    queryOptions({
      queryKey: skillKeys.list(params),
      queryFn: () => getSkills({ ...params }),
    }),
  my: (params?: SkillsProfileSearchParams) =>
    queryOptions({
      queryKey: skillKeys.my(params),
      queryFn: () => getMySkills({ ...params }),
    }),
};

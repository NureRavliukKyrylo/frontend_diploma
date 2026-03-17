import { skillsQuery } from "../queries/skillQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsQueryResult } from "../types/SkillsQueryResult";
import type { SkillsProfileSearchParams } from "@entities/skill/libs";
import type { SkillProfile } from "../types/SkillProfile";

export const useMySkillsListQuery =
  (params?: SkillsProfileSearchParams) =>
  (): SkillsQueryResult<SkillProfile> => {
    const { data } = useSuspenseQuery(skillsQuery.my(params));
    return { data: data.data };
  };

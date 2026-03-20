import { skillsQuery } from "../queries/skillQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsProfileSearchParams } from "@entities/skill/libs";
import type { SkillProfile } from "../types/SkillProfile";
import type { QueryResult } from "@shared/config/types";

export const useMySkillsListQuery =
  (params?: SkillsProfileSearchParams) => (): QueryResult<SkillProfile> => {
    const { data } = useSuspenseQuery(skillsQuery.my(params));
    return { data: data.data };
  };

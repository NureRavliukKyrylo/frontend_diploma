import { skillsQuery } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillProfile } from "../types";
import type { QueryResult } from "@shared/config/types";
import type { SkillsProfileSearchParams } from "@entities/user";

export const useMySkillsListQuery =
  (params: SkillsProfileSearchParams) => (): QueryResult<SkillProfile> => {
    const { data } = useSuspenseQuery(skillsQuery.my(params));
    return { data: data.data };
  };

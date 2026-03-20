import { skillsQuery } from "../queries/skillQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsSearchParams } from "@entities/skill/libs";
import type { Skill } from "../types/Skill";
import type { QueryResult } from "@shared/config/types";

export const useSkillsListQuery =
  (search: SkillsSearchParams) => (): QueryResult<Skill> => {
    const { data } = useSuspenseQuery(skillsQuery.list(search));
    return { data: data.data };
  };

import { skillsQuery } from "../queries/skillQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsSearchParams } from "@entities/skill/libs";
import type { SkillsQueryResult } from "../types/SkillsQueryResult";
import type { Skill } from "../types/Skill";

export const useSkillsListQuery =
  (search: SkillsSearchParams) => (): SkillsQueryResult<Skill> => {
    const { data } = useSuspenseQuery(skillsQuery.list(search));
    return { data: data.data };
  };

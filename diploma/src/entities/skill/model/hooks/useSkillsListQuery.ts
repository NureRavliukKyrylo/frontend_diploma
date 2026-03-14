import { skillsQuery } from "../queries/skillQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsSearchParams } from "@entities/skill/libs";
import type { SkillsQueryResult } from "../types/SkillsQueryResult";

export const useSkillsListQuery =
  (search: SkillsSearchParams) => (): SkillsQueryResult => {
    const { data } = useSuspenseQuery(skillsQuery.list(search));
    return { data: data.data };
  };

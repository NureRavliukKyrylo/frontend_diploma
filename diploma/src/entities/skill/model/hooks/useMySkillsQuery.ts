import { skillsQuery } from "../queries/skillQueries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsQueryResult } from "../types/SkillsQueryResult";

export const useMySkillsListQuery = () => (): SkillsQueryResult => {
  const { data } = useSuspenseQuery(skillsQuery.my());
  return { data: data.data };
};

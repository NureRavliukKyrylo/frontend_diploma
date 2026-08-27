import { skillsQuery } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { SkillsSearchParams } from "../../libs";
import type { Skill } from "../types";
import type { QueryResult } from "@shared/config/types";

export const useSkillsListQuery =
  (search: SkillsSearchParams) => (): QueryResult<Skill> => {
    const { data } = useSuspenseQuery(skillsQuery.list(search));
    return { data: data.data };
  };

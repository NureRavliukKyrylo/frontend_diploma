import type { Skill } from "./Skill";

export type SkillsQueryResult<TSkill = Skill> = {
  data: TSkill[] | undefined;
  isLoading?: boolean;
};

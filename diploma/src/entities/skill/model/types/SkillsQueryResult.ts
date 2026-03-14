import type { Skill } from "./Skill";

export type SkillsQueryResult = {
  data: Skill[] | undefined;
  isLoading?: boolean;
};

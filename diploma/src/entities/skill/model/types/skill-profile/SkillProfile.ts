import type { Skill } from "../skill/Skill";

export type SkillProfile = Omit<Skill, "id"> & {
  skillId: string;
  level: string;
  verified: boolean;
};

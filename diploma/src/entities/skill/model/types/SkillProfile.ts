import type { Skill } from "./Skill";

export type SkillProfile = Omit<Skill, "id"> & {
  skillId: string;
  level: number;
  verified: boolean;
};

import type { Skill } from "../skill/Skill";
import type { SkillLevel } from "../skill-level/SkillLevel";

export type SkillProfile = Omit<Skill, "id"> & {
  skillId: string;
  level: SkillLevel;
  verified: boolean;
};

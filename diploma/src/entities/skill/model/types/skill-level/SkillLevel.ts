export const SkillLevelType = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
  expert: 3,
};

export type SkillLevel = (typeof SkillLevelType)[keyof typeof SkillLevelType];

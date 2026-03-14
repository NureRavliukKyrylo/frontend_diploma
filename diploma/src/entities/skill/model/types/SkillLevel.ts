export const SkillLevelType = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
};

export type SkillLevel = (typeof SkillLevelType)[keyof typeof SkillLevelType];

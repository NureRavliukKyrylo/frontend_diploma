import type { TFunction } from "i18next";

export const getSkillLevelTranslations = (
  t: TFunction,
  skillLevel: string,
): string => {
  return t(`skill:skillLevel.${skillLevel}`);
};

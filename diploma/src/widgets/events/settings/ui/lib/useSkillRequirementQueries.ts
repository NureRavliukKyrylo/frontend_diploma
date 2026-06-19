import { useEffect, useState } from "react";
import type { Skill } from "@entities/skill";
import type { EventSettingsSkillRequirement } from "@features/event";

export const useSkillRequirementQueries = (
  requiredSkills: EventSettingsSkillRequirement[],
  skillsById: Map<string, Skill>,
) => {
  const [skillQueries, setSkillQueries] = useState<string[]>([]);
  const [focusedSkillIndex, setFocusedSkillIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setSkillQueries((current) => {
      const next = [...current];

      if (requiredSkills.length < next.length) {
        return next.slice(0, requiredSkills.length);
      }

      if (requiredSkills.length > next.length) {
        for (let index = next.length; index < requiredSkills.length; index += 1) {
          const skillName = skillsById.get(requiredSkills[index]?.skillId)?.name ?? "";
          next.push(skillName);
        }
      }

      return next;
    });
  }, [requiredSkills, requiredSkills.length, skillsById]);

  return {
    skillQueries,
    setSkillQueries,
    focusedSkillIndex,
    setFocusedSkillIndex,
  };
};

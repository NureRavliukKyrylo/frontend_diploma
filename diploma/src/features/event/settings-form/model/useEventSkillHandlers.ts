import type { Dispatch, SetStateAction } from "react";
import type {
  EventSettingsSkillRequirement,
  EventSettingsValues,
} from "./types";

interface UseEventSkillHandlersProps {
  setValues: Dispatch<SetStateAction<EventSettingsValues | null>>;
}

export const useEventSkillHandlers = ({
  setValues,
}: UseEventSkillHandlersProps) => {
  const handleSkillAdd = () => {
    setValues((current) =>
      current && current.requiredSkills.length < 10
        ? {
            ...current,
            requiredSkills: [
              ...current.requiredSkills,
              { skillId: "", expectedHours: 0 },
            ],
          }
        : current,
    );
  };

  const handleSkillChange = (
    index: number,
    patch: Partial<EventSettingsSkillRequirement>,
  ) => {
    setValues((current) =>
      current
        ? {
            ...current,
            requiredSkills: current.requiredSkills.map((skill, skillIndex) =>
              skillIndex === index ? { ...skill, ...patch } : skill,
            ),
          }
        : current,
    );
  };

  const handleSkillRemove = (index: number) => {
    setValues((current) =>
      current
        ? {
            ...current,
            requiredSkills: current.requiredSkills.filter(
              (_skill, skillIndex) => skillIndex !== index,
            ),
          }
        : current,
    );
  };

  return { handleSkillAdd, handleSkillChange, handleSkillRemove };
};

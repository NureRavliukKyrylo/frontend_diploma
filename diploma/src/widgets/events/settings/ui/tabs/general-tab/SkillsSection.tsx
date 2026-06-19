import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { IconPlus } from "@tabler/icons-react";
import { skillsQuery, type Skill } from "@entities/skill";
import {
  type EventSettingsLockState,
  type EventSettingsSkillRequirement,
  type EventSettingsValues,
} from "@features/event";
import { useSkillRequirementQueries } from "../../lib/useSkillRequirementQueries";
import sectionStyles from "./GeneralTabShared.module.scss";
import { SkillRequirementRow } from "./SkillRequirementRow";
import styles from "./SkillsSection.module.scss";

interface SkillsSectionProps {
  values: EventSettingsValues;
  lockState: EventSettingsLockState;
  onSkillAdd: () => void;
  onSkillChange: (
    index: number,
    patch: Partial<EventSettingsSkillRequirement>,
  ) => void;
  onSkillRemove: (index: number) => void;
}

export const SkillsSection = ({
  values,
  lockState,
  onSkillAdd,
  onSkillChange,
  onSkillRemove,
}: SkillsSectionProps) => {
  const { data: skillsResponse } = useQuery(
    skillsQuery.list({ Page: 1, PageSize: 100 }),
  );
  const skills = useMemo(
    () => skillsResponse?.data ?? [],
    [skillsResponse?.data],
  );
  const skillsById = useMemo(
    () => new Map(skills.map((skill) => [skill.id, skill])),
    [skills],
  );
  const {
    skillQueries,
    setSkillQueries,
    focusedSkillIndex,
    setFocusedSkillIndex,
  } = useSkillRequirementQueries(values.requiredSkills, skillsById);

  const getSuggestions = (query: string, index: number) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

    const selectedIds = new Set(
      values.requiredSkills
        .map((skill, skillIndex) =>
          skillIndex === index ? null : skill.skillId,
        )
        .filter(Boolean),
    );

    return skills
      .filter((skill) => !selectedIds.has(skill.id))
      .filter((skill) => skill.name.toLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  };

  const handleSkillInputChange = (index: number, value: string) => {
    setSkillQueries((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });

    const matchedSkill = skills.find(
      (skill) => skill.name.trim().toLowerCase() === value.trim().toLowerCase(),
    );

    onSkillChange(index, { skillId: matchedSkill?.id ?? "" });
  };

  const handleSelectSkill = (index: number, skill: Skill) => {
    setSkillQueries((current) => {
      const next = [...current];
      next[index] = skill.name;
      return next;
    });
    onSkillChange(index, { skillId: skill.id });
    setFocusedSkillIndex(null);
  };

  return (
    <section className={sectionStyles.section}>
      <h2 className={sectionStyles.sectionLabel}>Required skills</h2>
      <p className={sectionStyles.sectionDescription}>
        Specify skills volunteers should have. Optional.
      </p>

      <div
        className={`${styles.skillsSection} ${
          lockState.typeAndSkillsLocked ? sectionStyles.disabledBlock : ""
        }`}
      >
        <div className={styles.skillRows}>
          {values.requiredSkills.map((requirement, index) => {
            const searchValue = skillQueries[index] ?? "";
            const skillSuggestions = getSuggestions(searchValue, index);
            const disabled = lockState.typeAndSkillsLocked;

            return (
              <SkillRequirementRow
                key={`skill-row-${index}`}
                index={index}
                requirement={requirement}
                searchValue={searchValue}
                suggestions={skillSuggestions}
                focused={focusedSkillIndex === index}
                disabled={disabled}
                onFocus={() => setFocusedSkillIndex(index)}
                onBlur={() => {
                  window.setTimeout(() => {
                    setFocusedSkillIndex((current) =>
                      current === index ? null : current,
                    );
                  }, 120);
                }}
                onInputChange={(value) => handleSkillInputChange(index, value)}
                onSelectSkill={(skill) => handleSelectSkill(index, skill)}
                onHoursChange={(expectedHours) =>
                  onSkillChange(index, { expectedHours })
                }
                onRemove={() => {
                  setSkillQueries((current) =>
                    current.filter((_item, itemIndex) => itemIndex !== index),
                  );
                  onSkillRemove(index);
                }}
              />
            );
          })}
        </div>

        <button
          type="button"
          className={styles.addSkillButton}
          disabled={
            lockState.typeAndSkillsLocked || values.requiredSkills.length >= 10
          }
          onClick={onSkillAdd}
        >
          <IconPlus size={18} stroke={2.4} />
          Add skill requirement
        </button>
      </div>
    </section>
  );
};

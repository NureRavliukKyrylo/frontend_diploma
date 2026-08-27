import { IconPlus } from "@tabler/icons-react";
import type { Skill } from "@entities/skill";
import type { CreateEventSkillRequirement } from "../../../api/createEventApi";
import { EventSkillRequirementRow } from "./EventSkillRequirementRow";
import styles from "../CreateEventSteps.module.scss";

interface SkillsBlockProps {
  requiredSkills: CreateEventSkillRequirement[];
  skillQueries: string[];
  focusedSkillIndex: number | null;
  getSuggestions: (query: string, index: number) => Skill[];
  onFocus: (index: number) => void;
  onBlur: (index: number) => void;
  onInputChange: (index: number, value: string) => void;
  onSelectSkill: (index: number, skill: Skill) => void;
  onHoursChange: (index: number, expectedHours: number) => void;
  onRemove: (index: number) => void;
  onAddSkill: () => void;
}

export const SkillsBlock = ({
  requiredSkills,
  skillQueries,
  focusedSkillIndex,
  getSuggestions,
  onFocus,
  onBlur,
  onInputChange,
  onSelectSkill,
  onHoursChange,
  onRemove,
  onAddSkill,
}: SkillsBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.blockLabel}>Required skills</h2>
    <p className={styles.blockHint}>
      Specify skills volunteers should have. Optional.
    </p>

    <div className={styles.skillsSection}>
      <div className={styles.skillRows}>
        {requiredSkills.map((requirement, index) => {
          const searchValue = skillQueries[index] ?? "";

          return (
            <EventSkillRequirementRow
              key={`skill-row-${index}`}
              index={index}
              requirement={requirement}
              searchValue={searchValue}
              suggestions={getSuggestions(searchValue, index)}
              focused={focusedSkillIndex === index}
              onFocus={() => onFocus(index)}
              onBlur={() => onBlur(index)}
              onInputChange={(value) => onInputChange(index, value)}
              onSelectSkill={(skill) => onSelectSkill(index, skill)}
              onHoursChange={(expectedHours) =>
                onHoursChange(index, expectedHours)
              }
              onRemove={() => onRemove(index)}
            />
          );
        })}
      </div>

      <button
        type="button"
        className={styles.addSkillButton}
        disabled={requiredSkills.length >= 10}
        onClick={onAddSkill}
      >
        <IconPlus size={18} stroke={2.4} />
        Add skill requirement
      </button>

      <p className={styles.skillsHint}>
        {requiredSkills.length >= 10
          ? "Maximum 10 skill requirements added"
          : `${requiredSkills.length} of 10 skill rows used`}
      </p>
    </div>
  </section>
);

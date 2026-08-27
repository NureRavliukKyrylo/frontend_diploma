import { IconX } from "@tabler/icons-react";
import type { Skill } from "@entities/skill";
import type { EventSettingsSkillRequirement } from "@features/event";
import { useTranslation } from "react-i18next";
import styles from "./SkillsSection.module.scss";

interface SkillRequirementRowProps {
  index: number;
  requirement: EventSettingsSkillRequirement;
  searchValue: string;
  suggestions: Skill[];
  focused: boolean;
  disabled: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onInputChange: (value: string) => void;
  onSelectSkill: (skill: Skill) => void;
  onHoursChange: (hours: number) => void;
  onRemove: () => void;
}

export const SkillRequirementRow = ({
  index,
  requirement,
  searchValue,
  suggestions,
  focused,
  disabled,
  onFocus,
  onBlur,
  onInputChange,
  onSelectSkill,
  onHoursChange,
  onRemove,
}: SkillRequirementRowProps) => {
  const { t } = useTranslation("event");

  return (
    <div className={styles.skillRow}>
    <div className={styles.skillSearchField}>
      <input
        value={searchValue}
        placeholder={t("settings.general.skillPlaceholder")}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => onInputChange(event.target.value)}
      />

      {focused && searchValue.trim() && !disabled ? (
        <ul className={styles.skillSuggestions}>
          {suggestions.length > 0 ? (
            suggestions.map((skill) => (
              <li key={skill.id}>
                <button
                  type="button"
                  className={styles.skillSuggestionButton}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => onSelectSkill(skill)}
                >
                  {skill.name}
                </button>
              </li>
            ))
          ) : (
            <li className={styles.skillSuggestionsEmpty}>
              {t("settings.general.noSkills")}
            </li>
          )}
        </ul>
      ) : null}
    </div>

    <input
      type="number"
      min={0}
      value={requirement.expectedHours > 0 ? String(requirement.expectedHours) : ""}
      placeholder={t("settings.general.hours")}
      disabled={disabled}
      onChange={(event) => onHoursChange(Math.max(0, Number(event.target.value || 0)))}
    />

    <button
      type="button"
      className={styles.removeSkillButton}
      aria-label={t("settings.general.removeSkillAria", {
        number: index + 1,
      })}
      disabled={disabled}
      onClick={onRemove}
    >
      <IconX size={18} stroke={2.4} />
    </button>
    </div>
  );
};

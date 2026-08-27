import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import { skillsQuery, type Skill } from "@entities/skill";
import type { CreateEventSkillRequirement } from "../../api/createEventApi";
import type { CreateEventFormState } from "../../model/useCreateEventForm";
import { CategoriesBlock } from "./categories-skills-step/CategoriesBlock";
import { SkillsBlock } from "./categories-skills-step/SkillsBlock";
import styles from "./CreateEventSteps.module.scss";

interface CategoriesSkillsStepProps {
  categoryIds: CreateEventFormState["categoryIds"];
  requiredSkills: CreateEventFormState["requiredSkills"];
  onToggleCategory: (categoryId: string) => void;
  onAddSkill: () => void;
  onUpdateSkill: (
    index: number,
    patch: Partial<CreateEventSkillRequirement>,
  ) => void;
  onRemoveSkill: (index: number) => void;
}

export const CategoriesSkillsStep = ({
  categoryIds,
  requiredSkills,
  onToggleCategory,
  onAddSkill,
  onUpdateSkill,
  onRemoveSkill,
}: CategoriesSkillsStepProps) => {
  const [skillQueries, setSkillQueries] = useState<string[]>([]);
  const [focusedSkillIndex, setFocusedSkillIndex] = useState<number | null>(
    null,
  );
  const {
    data: categoriesResponse,
    isLoading,
    isError,
  } = useQuery(categoryQuery.list({ Page: 1, PageSize: 100 }));
  const { data: skillsResponse } = useQuery(
    skillsQuery.list({ Page: 1, PageSize: 100 }),
  );

  const categories = categoriesResponse?.data ?? [];
  const skills = useMemo(
    () => skillsResponse?.data ?? [],
    [skillsResponse?.data],
  );
  const skillsById = useMemo(
    () => new Map(skills.map((skill) => [skill.id, skill])),
    [skills],
  );
  const selectionLimitReached = categoryIds.length >= 5;

  useEffect(() => {
    setSkillQueries((current) => {
      const next = [...current];

      if (requiredSkills.length < next.length) {
        return next.slice(0, requiredSkills.length);
      }

      if (requiredSkills.length > next.length) {
        for (
          let index = next.length;
          index < requiredSkills.length;
          index += 1
        ) {
          const skillName =
            skillsById.get(requiredSkills[index]?.skillId)?.name ?? "";
          next.push(skillName);
        }
      }

      return next;
    });
  }, [requiredSkills.length, requiredSkills, skillsById]);

  const getSuggestions = (query: string, index: number) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

    const selectedIds = new Set(
      requiredSkills
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

    onUpdateSkill(index, { skillId: matchedSkill?.id ?? "" });
  };

  const handleSelectSkill = (index: number, skill: Skill) => {
    setSkillQueries((current) => {
      const next = [...current];
      next[index] = skill.name;
      return next;
    });
    onUpdateSkill(index, { skillId: skill.id });
    setFocusedSkillIndex(null);
  };

  return (
    <div className={styles.stepContent}>
      <div className={styles.formCard}>
        <span className={styles.cardDeco} />
        <CategoriesBlock
          categories={categories}
          categoryIds={categoryIds}
          isLoading={isLoading}
          isError={isError}
          selectionLimitReached={selectionLimitReached}
          onToggleCategory={onToggleCategory}
        />

        <SkillsBlock
          requiredSkills={requiredSkills}
          skillQueries={skillQueries}
          focusedSkillIndex={focusedSkillIndex}
          getSuggestions={getSuggestions}
          onFocus={setFocusedSkillIndex}
          onBlur={(index) => {
            window.setTimeout(() => {
              setFocusedSkillIndex((current) =>
                current === index ? null : current,
              );
            }, 120);
          }}
          onInputChange={handleSkillInputChange}
          onSelectSkill={handleSelectSkill}
          onHoursChange={(index, expectedHours) =>
            onUpdateSkill(index, { expectedHours })
          }
          onRemove={(index) => {
            setSkillQueries((current) =>
              current.filter((_item, itemIndex) => itemIndex !== index),
            );
            onRemoveSkill(index);
          }}
          onAddSkill={onAddSkill}
        />
      </div>
    </div>
  );
};

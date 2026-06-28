import type { SkillListItemDto } from "@entities/skill";
import { Skeleton } from "@heroui/react";
import { SkillCard } from "../../skill-card/ui/SkillCard";
import styles from "./SkillsGrid.module.scss";

interface SkillsGridProps {
  skills: SkillListItemDto[];
  isLoading: boolean;
  isError: boolean;
  onOpenSkill: (skill: SkillListItemDto) => void;
  onEditSkill: (skill: SkillListItemDto) => void;
  onChangeSkillIcon: (skill: SkillListItemDto) => void;
  onDeleteSkill: (skill: SkillListItemDto) => void;
}

export const SkillsGrid = ({
  skills,
  isLoading,
  isError,
  onOpenSkill,
  onEditSkill,
  onChangeSkillIcon,
  onDeleteSkill,
}: SkillsGridProps) => {
  if (isLoading) {
    return (
      <div className={styles.skillsGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className={styles.skillCardSkeleton} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.stateCard}>
        <strong>Skills unavailable</strong>
        <span>The skills endpoint could not be loaded.</span>
      </div>
    );
  }

  if (!skills.length) {
    return (
      <div className={styles.stateCard}>
        <strong>No skills found</strong>
        <span>Try a different search term or clear the current filters.</span>
      </div>
    );
  }

  return (
    <div className={styles.skillsGrid}>
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onOpen={() => onOpenSkill(skill)}
          onEdit={() => onEditSkill(skill)}
          onChangeIcon={() => onChangeSkillIcon(skill)}
          onDelete={() => onDeleteSkill(skill)}
        />
      ))}
    </div>
  );
};

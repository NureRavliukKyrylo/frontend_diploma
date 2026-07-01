import type { SkillListItemDto } from "@entities/skill";
import { Skeleton } from "@heroui/react";
import { SkillCard } from "../../skill-card/ui/SkillCard";
import styles from "./SkillsGrid.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("admin");
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
        <strong>{t("skills.states.errorTitle")}</strong>
        <span>{t("skills.states.errorText")}</span>
      </div>
    );
  }

  if (!skills.length) {
    return (
      <div className={styles.stateCard}>
        <strong>{t("skills.states.emptyTitle")}</strong>
        <span>{t("skills.states.emptyText")}</span>
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

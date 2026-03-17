import type { Skill, SkillProfile, SkillsQueryResult } from "@entities/skill";
import styles from "./SkillsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

interface SkillsListWidgetProps<TSkill = Skill> {
  useSkillsQuery?: () => SkillsQueryResult<TSkill>;
  skills?: TSkill[];
  renderCard: (skill: TSkill, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  startSlot?: React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const SkillsListWidget = <TSkill extends Skill | SkillProfile>({
  useSkillsQuery,
  renderCard,
  skills: readySkills,
  className,
  renderSkeleton,
  skeletonItems,
  startSlot,
}: SkillsListWidgetProps<TSkill>) => {
  const queryResult = useSkillsQuery?.();

  const skills = readySkills ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass = `${styles.skillsListWrapper} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      {startSlot}
      {skills?.map((skill, index) => renderCard(skill, index))}
    </div>
  );
};

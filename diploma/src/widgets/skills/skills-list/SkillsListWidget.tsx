import type { Skill, SkillsQueryResult } from "@entities/skill";
import styles from "./SkillsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

interface SkillsListWidgetProps {
  useSkillsQuery?: () => SkillsQueryResult;
  skills?: Skill[];
  renderCard: (skill: Skill) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  startSlot?: React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const SkillsListWidget = ({
  useSkillsQuery,
  renderCard,
  skills: readySkills,
  className,
  renderSkeleton,
  skeletonItems,
  startSlot,
}: SkillsListWidgetProps) => {
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
      {skills?.map((skill) => renderCard(skill))}
    </div>
  );
};

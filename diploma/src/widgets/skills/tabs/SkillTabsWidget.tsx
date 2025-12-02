import { SkillTab } from "@entities/skill";
import type { Skill } from "@entities/skill/model";
import { ShowMoreItemsButton } from "@shared/ui/buttons";
import styles from "./SkillTabsWidget.module.scss";

interface SkillTabsWidgetProps {
  skills: Skill[];
  initialVisibleCount?: number;
}

export const SkillTabsWidget = ({
  skills,
  initialVisibleCount = 5,
}: SkillTabsWidgetProps) => {
  const skillItems = skills.map((skill) => (
    <SkillTab key={skill.name} name={skill.name} />
  ));

  return (
    <div className={styles.skillTabsBlock}>
      <ShowMoreItemsButton
        items={skillItems}
        initialVisibleCount={initialVisibleCount}
        buttonText="See more"
        buttonTextCollapsed="See less"
        className={styles.showMoreContainer}
        classNameButton={styles.showMoreButton}
      />
    </div>
  );
};

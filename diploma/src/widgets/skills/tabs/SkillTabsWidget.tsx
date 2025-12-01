import { SkillTab } from "@entities/skill/ui/skill-tab/SkillTab";
import type { Skill } from "@entities/skill/model";
import styles from "./SkillTabsWidget.module.scss";

interface SkillTabsWidgetProps {
  skills: Skill[];
}

export const SkillTabsWidget = ({ skills }: SkillTabsWidgetProps) => {
  return (
    <div className={styles.skillTabsBlock}>
      {skills.map((skill) => (
        <SkillTab key={skill.name} name={skill.name} />
      ))}
    </div>
  );
};

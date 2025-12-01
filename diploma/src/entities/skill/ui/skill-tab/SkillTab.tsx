import type { Skill } from "@entities/skill/model";
import styles from "./SkillTab.module.scss";

export const SkillTab = (skill: Skill) => {
  return (
    <div className={styles.skillTabWrapper}>
      <h1 className={styles.skillName}>{skill.name}</h1>
    </div>
  );
};

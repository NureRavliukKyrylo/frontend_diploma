import styles from "./SkillTab.module.scss";

interface SkillTabProps {
  name: string;
}
export const SkillTab = ({ name }: SkillTabProps) => {
  return (
    <div className={styles.skillTabWrapper}>
      <h1 className={styles.skillName}>{name}</h1>
    </div>
  );
};

import { useTranslation } from "react-i18next";
import styles from "./MatchedSkills.module.scss";

export const MatchedSkills = ({ skillNames }: { skillNames: string[] }) => {
  const { t } = useTranslation("organizations");
  if (skillNames.length === 0) return null;

  const visibleSkills = skillNames.slice(0, 3);
  const remainingCount = skillNames.length - visibleSkills.length;

  return (
    <div
      className={styles.skills}
      aria-label={t("recommendations.skills.matched", {
        count: skillNames.length,
      })}
    >
      {visibleSkills.map((skillName) => (
        <span key={skillName} className={styles.skill}>
          {skillName}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className={styles.more}>
          {t("recommendations.skills.more", { count: remainingCount })}
        </span>
      )}
    </div>
  );
};

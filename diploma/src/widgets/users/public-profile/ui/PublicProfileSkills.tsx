import { BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PublicVolunteerSkill } from "@entities/user/profile";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { SkillMedallion } from "./SkillMedallion";
import styles from "./PublicProfileSkills.module.scss";

export const PublicProfileSkills = ({
  skills,
}: {
  skills: PublicVolunteerSkill[];
}) => {
  const { t } = useTranslation("common");

  return (
    <ProfileSectionCard
      title={t("publicProfile.sections.skills")}
      meta={`${skills.length}`}
    >
    {skills.length > 0 ? (
      <div className={styles.grid}>
        {skills.map((skill) => (
          <article key={skill.skillId} className={styles.skill}>
            <SkillMedallion iconUrl={skill.iconUrl} name={skill.name} />
            <div className={styles.copy}>
              <h3>
                {skill.name}
                {skill.verified && <BadgeCheck size={16} />}
              </h3>
              <span>
                {t(`publicProfile.skills.levels.${skill.level}`, {
                  defaultValue: skill.level,
                })}
              </span>
            </div>
          </article>
        ))}
      </div>
    ) : (
      <p className={styles.empty}>{t("publicProfile.skills.empty")}</p>
    )}
    </ProfileSectionCard>
  );
};

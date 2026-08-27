import type { SkillListItemDto } from "@entities/skill";
import type { KeyboardEvent } from "react";
import { getSkillInitials, getSkillTone } from "../../lib/skillVisuals";
import { SkillCardMenu } from "./SkillCardMenu";
import styles from "./SkillCard.module.scss";
import { useTranslation } from "react-i18next";

interface SkillCardProps {
  skill: SkillListItemDto;
  onOpen: () => void;
  onEdit: () => void;
  onChangeIcon: () => void;
  onDelete: () => void;
}

export const SkillCard = ({
  skill,
  onOpen,
  onEdit,
  onChangeIcon,
  onDelete,
}: SkillCardProps) => {
  const { t } = useTranslation("admin");
  const tone = getSkillTone(skill);
  const visibleCategories = skill.categories.slice(0, 2);
  const remainingCategories =
    skill.categories.length - visibleCategories.length;

  const openFromKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={styles.skillCard}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={openFromKeyboard}
    >
      <span className={styles.skillCardDeco} aria-hidden="true" />

      <div className={styles.skillCardHeader}>
        <span
          className={styles.skillIcon}
          style={{
            background: skill.iconUrl ? undefined : tone.background,
            color: skill.iconUrl ? undefined : tone.color,
          }}
        >
          {skill.iconUrl ? (
            <img
              src={skill.iconUrl}
              alt={skill.name}
              className={styles.skillIconImg}
            />
          ) : (
            <span className={styles.skillIconFallback}>
              {getSkillInitials(skill.name)}
            </span>
          )}
        </span>

        <SkillCardMenu
          triggerClassName={styles.menuTrigger}
          onEdit={onEdit}
          onChangeIcon={onChangeIcon}
          onViewVolunteers={onOpen}
          onDelete={onDelete}
        />
      </div>

      <div className={styles.skillName}>{skill.name}</div>

      <div className={styles.categoryPills}>
        {visibleCategories.length ? (
          <>
            {visibleCategories.map((category) => (
              <span key={category.id} className={styles.categoryPill}>
                {category.name}
              </span>
            ))}
            {remainingCategories > 0 && (
              <span className={styles.categoryPill}>
                +{remainingCategories}
              </span>
            )}
          </>
        ) : (
          <span
            className={`${styles.categoryPill} ${styles.categoryPillMuted}`}
          >
            {t("skills.noCategories")}
          </span>
        )}
      </div>

      <div className={styles.cardFooter}>
        <span>
          {skill.description
            ? t("skills.descriptionReady")
            : t("skills.noDescription")}
        </span>
        <span className={styles.viewLink}>{t("skills.viewDetails")}</span>
      </div>
    </article>
  );
};

import { skillQuery, type SkillListItemDto } from "@entities/skill";
import { addToast, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSkillInitials, getSkillTone } from "../../lib/skillVisuals";
import styles from "./SkillDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface SkillDrawerProps {
  skill: SkillListItemDto | null;
  onClose: () => void;
  onEdit: (skill: SkillListItemDto) => void;
  onDelete: (skill: SkillListItemDto, totalVolunteers: number) => void;
}

const getVolunteerInitials = (name: string | null, userId: string) =>
  (name || userId || "Volunteer")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IF";

export const SkillDrawer = ({
  skill,
  onClose,
  onEdit,
  onDelete,
}: SkillDrawerProps) => {
  const { t } = useTranslation("admin");
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);
  const [copiedSkillId, setCopiedSkillId] = useState(false);
  const volunteersQueryOptions = skillQuery.volunteers(skill?.id ?? "");
  const volunteersQuery = useQuery({
    ...volunteersQueryOptions,
    enabled: Boolean(skill?.id),
  });

  useEffect(() => {
    setShowAllVolunteers(false);
    setCopiedSkillId(false);
  }, [skill?.id]);

  if (!skill) {
    return null;
  }

  const tone = getSkillTone(skill);
  const volunteers = volunteersQuery.data ?? [];
  const visibleVolunteers = showAllVolunteers
    ? volunteers
    : volunteers.slice(0, 6);
  const verifiedCount = volunteers.filter(
    (volunteer) => volunteer.verified,
  ).length;

  const copySkillId = async () => {
    try {
      await navigator.clipboard?.writeText(skill.id);
      addToast({ title: t("skills.drawer.copiedToast"), color: "success" });
    } finally {
      setCopiedSkillId(true);
      window.setTimeout(() => setCopiedSkillId(false), 1400);
    }
  };

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <aside
        className={styles.drawer}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.drawerStripe} />

        <div className={styles.drawerHeader}>
          <div className={styles.drawerHeaderMain}>
            <span
              className={styles.drawerIcon}
              style={{
                background: skill.iconUrl ? undefined : tone.background,
                color: skill.iconUrl ? undefined : tone.color,
              }}
            >
              {skill.iconUrl ? (
                <img src={skill.iconUrl} alt={skill.name} />
              ) : (
                getSkillInitials(skill.name)
              )}
            </span>
            <div className={styles.drawerIdentity}>
              <div className={styles.drawerTitle}>{skill.name}</div>
              <button
                type="button"
                className={styles.drawerMeta}
                onClick={copySkillId}
              >
                <Copy size={14} aria-hidden="true" />
                <span>ID {skill.id}</span>
                {copiedSkillId && <em>{t("skills.drawer.copied")}</em>}
              </button>
            </div>
          </div>

          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label={t("skills.drawer.close")}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.drawerBody}>
          {skill.categories.length > 0 && (
            <div className={styles.categoryPills}>
              {skill.categories.map((category) => (
                <span key={category.id} className={styles.categoryPill}>
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {skill.description && (
            <section className={styles.section}>
              <div className={styles.sectionLabel}>
                {t("skills.drawer.description")}
              </div>
              <p className={styles.description}>{skill.description}</p>
            </section>
          )}

          <section className={styles.section}>
            <div className={styles.sectionLabel}>
              {t("skills.drawer.usage")}
            </div>
            <div className={styles.usageGrid}>
              <div className={styles.usageTile}>
                <span className={styles.usageValue}>{volunteers.length}</span>
                <span className={styles.usageLabel}>
                  {t("skills.drawer.totalVolunteers")}
                </span>
              </div>
              <div className={styles.usageTile}>
                <span
                  className={`${styles.usageValue} ${styles.usageValueVerified}`}
                >
                  {verifiedCount}
                </span>
                <span className={styles.usageLabel}>
                  {t("skills.drawer.verified")}
                </span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>
              {t("skills.drawer.volunteers")}
            </div>
            {volunteersQuery.isLoading ? (
              <Skeleton className={styles.volunteersSkeleton} />
            ) : volunteersQuery.isError ? (
              <div className={styles.emptyState}>
                {t("skills.drawer.loadError")}
              </div>
            ) : volunteers.length === 0 ? (
              <div className={styles.emptyState}>
                {t("skills.drawer.empty")}
              </div>
            ) : (
              <>
                {visibleVolunteers.map((volunteer) => {
                  const volunteerName =
                    volunteer.fullName ||
                    t("skills.drawer.volunteer", {
                      index: volunteer.userId.slice(0, 6),
                    });

                  return (
                    <div key={volunteer.id} className={styles.volunteerRow}>
                      <span className={styles.volunteerAvatar}>
                        {volunteer.avatarUrl ? (
                          <img src={volunteer.avatarUrl} alt={volunteerName} />
                        ) : (
                          getVolunteerInitials(
                            volunteer.fullName,
                            volunteer.userId,
                          )
                        )}
                      </span>
                      <span className={styles.volunteerName}>
                        {volunteerName}
                      </span>
                      <span className={styles.levelPill}>
                        {volunteer.level}
                      </span>
                      <span
                        className={
                          volunteer.verified
                            ? styles.verifiedPill
                            : styles.unverifiedPill
                        }
                      >
                        {volunteer.verified
                          ? t("users.metrics.verified")
                          : t("users.metrics.unverified")}
                      </span>
                    </div>
                  );
                })}
                {volunteers.length > 6 && (
                  <button
                    type="button"
                    className={styles.showAllButton}
                    onClick={() => setShowAllVolunteers((current) => !current)}
                  >
                    {showAllVolunteers
                      ? t("skills.drawer.showFewer")
                      : t("skills.drawer.showAll", {
                          count: volunteers.length,
                        })}
                  </button>
                )}
              </>
            )}
          </section>
        </div>

        <div className={styles.drawerFooter}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(skill, volunteers.length)}
          >
            <Trash2 size={17} aria-hidden="true" />
            {t("skills.drawer.delete")}
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(skill)}
          >
            <Pencil size={17} aria-hidden="true" />
            {t("skills.drawer.edit")}
          </button>
        </div>
      </aside>
    </div>
  );
};

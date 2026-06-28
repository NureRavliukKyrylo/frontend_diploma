import { skillQuery, type SkillListItemDto } from "@entities/skill";
import { addToast, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Pencil, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSkillInitials, getSkillTone } from "../../lib/skillVisuals";
import styles from "./SkillDrawer.module.scss";

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
  const verifiedCount = volunteers.filter((volunteer) => volunteer.verified).length;

  const copySkillId = async () => {
    try {
      await navigator.clipboard?.writeText(skill.id);
      addToast({ title: "Skill ID copied", color: "success" });
    } finally {
      setCopiedSkillId(true);
      window.setTimeout(() => setCopiedSkillId(false), 1400);
    }
  };

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <aside className={styles.drawer} onClick={(event) => event.stopPropagation()}>
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
                {copiedSkillId && <em>Copied</em>}
              </button>
            </div>
          </div>

          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label="Close skill details"
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
              <div className={styles.sectionLabel}>Description</div>
              <p className={styles.description}>{skill.description}</p>
            </section>
          )}

          <section className={styles.section}>
            <div className={styles.sectionLabel}>Usage</div>
            <div className={styles.usageGrid}>
              <div className={styles.usageTile}>
                <span className={styles.usageValue}>{volunteers.length}</span>
                <span className={styles.usageLabel}>Total volunteers</span>
              </div>
              <div className={styles.usageTile}>
                <span
                  className={`${styles.usageValue} ${styles.usageValueVerified}`}
                >
                  {verifiedCount}
                </span>
                <span className={styles.usageLabel}>Verified</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}>Volunteers with this skill</div>
            {volunteersQuery.isLoading ? (
              <Skeleton className={styles.volunteersSkeleton} />
            ) : volunteersQuery.isError ? (
              <div className={styles.emptyState}>
                Volunteers could not be loaded.
              </div>
            ) : volunteers.length === 0 ? (
              <div className={styles.emptyState}>
                No volunteers have claimed this skill yet.
              </div>
            ) : (
              <>
                {visibleVolunteers.map((volunteer) => {
                  const volunteerName =
                    volunteer.fullName || `Volunteer ${volunteer.userId.slice(0, 6)}`;

                  return (
                    <div key={volunteer.id} className={styles.volunteerRow}>
                      <span className={styles.volunteerAvatar}>
                        {volunteer.avatarUrl ? (
                          <img src={volunteer.avatarUrl} alt={volunteerName} />
                        ) : (
                          getVolunteerInitials(volunteer.fullName, volunteer.userId)
                        )}
                      </span>
                      <span className={styles.volunteerName}>{volunteerName}</span>
                      <span className={styles.levelPill}>{volunteer.level}</span>
                      <span
                        className={
                          volunteer.verified
                            ? styles.verifiedPill
                            : styles.unverifiedPill
                        }
                      >
                        {volunteer.verified ? "Verified" : "Unverified"}
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
                      ? "Show fewer volunteers"
                      : `Show all ${volunteers.length} volunteers`}
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
            Delete skill
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(skill)}
          >
            <Pencil size={17} aria-hidden="true" />
            Edit skill
          </button>
        </div>
      </aside>
    </div>
  );
};

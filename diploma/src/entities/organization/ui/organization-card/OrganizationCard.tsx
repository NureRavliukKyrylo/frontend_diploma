import type { KeyboardEvent, MouseEvent } from "react";
import {
  IconSettings,
  IconShare2,
  IconStarFilled,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import type { Organization } from "../../model/types";
import type { OrganizationCardMeta } from "../../lib/buildOrganizationCardMeta";
import styles from "./OrganizationCard.module.scss";

interface OrganizationCardProps {
  organization: Organization;
  meta: OrganizationCardMeta;
  isOwner: boolean;
  onUnsubscribe: (organization: Organization) => void;
  onShare: (organization: Organization) => void;
}

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

export const OrganizationCard = ({
  organization,
  meta,
  isOwner,
  onUnsubscribe,
  onShare,
}: OrganizationCardProps) => {
  const navigate = useNavigate();
  const [primaryCategory, secondaryCategory, ...restCategories] = meta.categories;
  const visibleCategories = [primaryCategory, secondaryCategory].filter(
    (category): category is string => Boolean(category),
  );
  const formattedRating =
    meta.rating === null ? "—" : meta.rating.toFixed(1);

  const openOrganization = () => {
    void navigate({
      to: "/organizations/$id",
      params: { id: organization.id },
    });
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openOrganization();
    }
  };

  const stopAction = (
    event: MouseEvent<HTMLButtonElement>,
    action: () => void,
  ) => {
    event.stopPropagation();
    action();
  };

  return (
    <article
      className={styles.card}
      role="link"
      tabIndex={0}
      onClick={openOrganization}
      onKeyDown={handleCardKeyDown}
      aria-label={`Open ${organization.name}`}
    >
      <span
        className={`${styles.ribbon} ${
          isOwner ? styles.ribbonOwner : styles.ribbonMember
        }`}
      >
        {isOwner ? "Owner" : "Member"}
      </span>

      <div className={styles.cardTop}>
        <div className={styles.avatarWrap}>
          <div
            className={`${styles.avatar} ${
              !organization.logoUrl
                ? isOwner
                  ? styles.avatarOwner
                  : styles.avatarMember
                : ""
            }`}
          >
            {organization.logoUrl ? (
              <img
                src={organization.logoUrl}
                alt={organization.name}
                className={styles.avatarImage}
              />
            ) : (
              getInitials(organization.name)
            )}
          </div>
        </div>

        <div className={styles.cardTitleWrap}>
          <h2 className={styles.cardTitle}>{organization.name}</h2>
          <div className={styles.cardMeta}>
            <IconUsers size={15} stroke={2} />
            <span>
              {meta.memberCount} members · {meta.location}
            </span>
          </div>
          <div className={styles.levelRow}>
            <span className={styles.levelBadge}>
              LVL {meta.level ?? "—"}
            </span>
            <span className={styles.levelBar}>
              <span
                className={styles.levelFill}
                style={{ width: `${meta.levelProgress}%` }}
              />
            </span>
            <span className={styles.levelPct}>
              {Math.round(meta.levelProgress)}%
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tagsRow}>
        {visibleCategories.length > 0 ? (
          <>
            {visibleCategories.map((category) => (
              <span key={category} className={styles.tag}>
                {category}
              </span>
            ))}
            {restCategories.length > 0 && (
              <span className={styles.tagMore}>+{restCategories.length}</span>
            )}
          </>
        ) : (
          <span className={styles.tagPlaceholder}>No categories yet</span>
        )}
      </div>

      <div className={styles.statsWrapper}>
        <div className={styles.statsRow}>
          <div className={styles.statCell}>
            <strong
              className={`${styles.statVal} ${
                meta.rating !== null ? styles.statValAccent : ""
              }`}
            >
              {meta.rating !== null && <IconStarFilled aria-hidden="true" />}
              {formattedRating}
            </strong>
            <span className={styles.statLbl}>Rating</span>
          </div>
          <div className={styles.statCell}>
            <strong className={styles.statVal}>{meta.totalActivities}</strong>
            <span className={styles.statLbl}>All activities</span>
          </div>
          <div className={styles.statCell}>
            <strong className={styles.statVal}>{meta.activeActivities}</strong>
            <span className={styles.statLbl}>Active</span>
          </div>
        </div>
      </div>

      <div className={styles.cardActions}>
        {isOwner ? (
          <button
            type="button"
            className={styles.btnManage}
            onClick={(event) =>
              stopAction(event, () => {
                void navigate({
                  to: "/organizations/$id/settings",
                  params: { id: organization.id },
                });
              })
            }
          >
            <IconSettings size={17} stroke={2} />
            Manage
          </button>
        ) : (
          <button
            type="button"
            className={styles.btnLeave}
            onClick={(event) =>
              stopAction(event, () => onUnsubscribe(organization))
            }
          >
            Leave
          </button>
        )}
        <button
          type="button"
          className={styles.btnShare}
          onClick={(event) => stopAction(event, () => onShare(organization))}
          aria-label={`Share ${organization.name}`}
        >
          <IconShare2 size={19} stroke={2} />
        </button>
      </div>
    </article>
  );
};

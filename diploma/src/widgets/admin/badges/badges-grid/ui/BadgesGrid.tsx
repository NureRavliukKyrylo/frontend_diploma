import {
  BadgeCard,
  TierColors,
  type AdminBadgeListItem,
} from "@entities/badge";
import { Skeleton } from "@heroui/react";
import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import type { CSSProperties } from "react";
import { BadgeAdminCardMenu } from "../../badge-card/ui/BadgeAdminCardMenu";
import { toBadgeCardModel } from "../../lib/badgeCardAdapter";
import styles from "./BadgesGrid.module.scss";
import { useTranslation } from "react-i18next";

interface BadgesGridProps {
  badges: AdminBadgeListItem[];
  isLoading: boolean;
  isError: boolean;
  onOpenBadge: (badge: AdminBadgeListItem) => void;
  onEditBadge: (badge: AdminBadgeListItem) => void;
  onChangeBadgeIcon: (badge: AdminBadgeListItem) => void;
  onArchiveBadge: (badge: AdminBadgeListItem) => void;
  onRecoverBadge: (badge: AdminBadgeListItem) => void;
  onDeleteBadge: (badge: AdminBadgeListItem) => void;
}

export const BadgesGrid = ({
  badges,
  isLoading,
  isError,
  onOpenBadge,
  onEditBadge,
  onChangeBadgeIcon,
  onArchiveBadge,
  onRecoverBadge,
  onDeleteBadge,
}: BadgesGridProps) => {
  const { t } = useTranslation("admin");

  if (isLoading) {
    return (
      <div className={styles.badgesGrid}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className={styles.badgeSkeleton} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.stateCard}>
        <strong>{t("badges.states.errorTitle")}</strong>
        <span>{t("badges.states.errorText")}</span>
      </div>
    );
  }

  if (!badges.length) {
    return (
      <div className={styles.stateCard}>
        <strong>{t("badges.states.emptyTitle")}</strong>
        <span>{t("badges.states.emptyText")}</span>
      </div>
    );
  }

  return (
    <div className={styles.badgesGrid}>
      {badges.map((badge, index) => (
        <motion.article
          key={badge.id}
          className={styles.badgeCell}
          style={
            {
              "--tier-color": TierColors[badge.rank.name],
            } as CSSProperties
          }
          role="button"
          tabIndex={0}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.32, delay: index * 0.04 }}
          whileHover={{
            scale: 1.03,
            boxShadow: `0 18px 36px ${TierColors[badge.rank.name]}35`,
          }}
          onClick={() => onOpenBadge(badge)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenBadge(badge);
            }
          }}
        >
          <div className={styles.posterWrap}>
            <BadgeCard badge={toBadgeCardModel(badge)} />
            {badge.isArchived && (
              <div className={styles.archivedOverlay}>
                {t("badges.card.archived")}
              </div>
            )}
            <BadgeAdminCardMenu
              triggerClassName={styles.menuTrigger}
              isArchived={badge.isArchived}
              onView={() => onOpenBadge(badge)}
              onEdit={() => onEditBadge(badge)}
              onChangeIcon={() => onChangeBadgeIcon(badge)}
              onArchive={() => onArchiveBadge(badge)}
              onRecover={() => onRecoverBadge(badge)}
              onDelete={() => onDeleteBadge(badge)}
            />
            <div className={styles.awardedPill}>
              <Medal size={14} aria-hidden="true" />
              {badge.awardedCountTotal}
            </div>
          </div>

          <div className={styles.badgeInfo}>
            <h3>{badge.title}</h3>
            <span style={{ color: TierColors[badge.rank.name] }}>
              {t("badges.card.rank", { rank: badge.rank.name })}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

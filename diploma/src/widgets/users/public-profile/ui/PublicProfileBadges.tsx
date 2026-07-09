import {
  BadgeCard,
  badgesQuery,
  type Badge,
  type BadgeCardModel,
  type Tier,
} from "@entities/badge";
import { useTranslation } from "react-i18next";
import type { PublicBadgePreview } from "@entities/user/profile";
import { ProfileSectionCard } from "./ProfileSectionCard";
import styles from "./PublicProfileBadges.module.scss";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

const supportedRanks = new Set(["S", "A", "B", "C", "D", "E", "F"]);

const normalizeRank = (rank: string): Tier => {
  const normalizedRank = rank.toUpperCase();
  return supportedRanks.has(normalizedRank) ? (normalizedRank as Tier) : "F";
};

const toBadge = (
  badge: PublicBadgePreview,
  liveBadge?: Badge,
): BadgeCardModel => ({
  id: badge.id,
  title: liveBadge?.title || badge.title,
  iconUrl: liveBadge?.iconUrl || badge.iconUrl,
  rank: {
    name: liveBadge?.rank.name ?? normalizeRank(badge.rank),
  },
  isUnlocked: true,
});

interface PublicProfileBadgesProps {
  badges: PublicBadgePreview[];
  unlockedCount: number;
  lockedCount: number;
}

export const PublicProfileBadges = ({
  badges,
  unlockedCount,
  lockedCount,
}: PublicProfileBadgesProps) => {
  const { t } = useTranslation("common");
  const badgeDetails = useQueries({
    queries: badges.map((badge) => ({
      ...badgesQuery.id(badge.id),
      enabled: Boolean(badge.id),
      retry: false,
    })),
  });
  const liveBadgesById = useMemo(() => {
    return new Map(
      badgeDetails
        .map((query) => query.data)
        .filter((badge): badge is Badge => Boolean(badge))
        .map((badge) => [badge.id, badge]),
    );
  }, [badgeDetails]);

  return (
    <ProfileSectionCard
      title={t("publicProfile.sections.badges")}
      meta={t("publicProfile.badges.progress", {
        unlocked: unlockedCount,
        total: unlockedCount + lockedCount,
      })}
    >
    {badges.length > 0 ? (
      <div className={styles.grid}>
        {badges.map((badge) => (
          <div key={badge.id} className={styles.badge}>
            <BadgeCard badge={toBadge(badge, liveBadgesById.get(badge.id))} />
            <strong>{badge.title}</strong>
          </div>
        ))}
      </div>
    ) : (
      <p className={styles.empty}>{t("publicProfile.badges.empty")}</p>
    )}
    </ProfileSectionCard>
  );
};

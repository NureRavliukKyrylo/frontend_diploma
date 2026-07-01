import { BadgeCard, type BadgeCardModel, type Tier } from "@entities/badge";
import { useTranslation } from "react-i18next";
import type { PublicBadgePreview } from "@entities/user/profile";
import { ProfileSectionCard } from "./ProfileSectionCard";
import styles from "./PublicProfileBadges.module.scss";

const supportedRanks = new Set(["S", "A", "B", "C", "D", "E", "F"]);

const toBadge = (badge: PublicBadgePreview): BadgeCardModel => ({
  id: badge.id,
  title: badge.title,
  iconUrl: badge.iconUrl,
  rank: {
    name: supportedRanks.has(badge.rank)
      ? (badge.rank as Tier)
      : "F",
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
            <BadgeCard badge={toBadge(badge)} />
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

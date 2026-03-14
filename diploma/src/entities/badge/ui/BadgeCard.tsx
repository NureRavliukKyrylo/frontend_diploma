import type { Badge } from "../model/types/Badge";
import { TierColors } from "../model/types/TierColors";
import styles from "./BadgeCard.module.scss";

export interface BadgeCardProps {
  badge: Badge;
}
export const BadgeCard = ({ badge }: BadgeCardProps) => {
  return (
    <div
      className={styles.badgeImageBlock}
      style={{ backgroundImage: `url(${badge.image})` }}
    >
      <div
        className={styles.badgeInfoTier}
        style={{ color: TierColors[badge.tier] }}
      >
        <h1>{badge.tier}</h1>
      </div>
    </div>
  );
};

export const BadgeCardDetailed = ({ badge }: BadgeCardProps) => {
  return (
    <div className={styles.badgeCardWrapper}>
      <BadgeCard badge={badge} />
      <div className={styles.badgeInfo}>
        <span className={styles.badgeName}>{badge.name}</span>
        <span style={{ color: TierColors[badge.tier] }}>{badge.tier}</span>
      </div>
    </div>
  );
};

import type { Badge } from "../model/types/Badge";
import { TierColors } from "../model/types/TierColors";
import styles from "./BadgeCard.module.scss";

interface BadgeCardProps {
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

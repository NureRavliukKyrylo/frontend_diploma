import { TierColors } from "../model/types/TierColors";
import type { Tier } from "../model/types/TierList";
import styles from "./BadgeCard.module.scss";

interface BadgeCardProps {
  badgeImage: string;
  tier: Tier;
}

export const BadgeCard = ({ badgeImage, tier }: BadgeCardProps) => {
  return (
    <div
      className={styles.badgeImageBlock}
      style={{ backgroundImage: `url(${badgeImage})` }}
    >
      <div className={styles.badgeInfoTier} style={{ color: TierColors[tier] }}>
        <h1>{tier}</h1>
      </div>
    </div>
  );
};

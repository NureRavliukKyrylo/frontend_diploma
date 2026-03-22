import { TierColors, type Badge } from "../model";
import styles from "./BadgeCard.module.scss";

export interface BadgeCardProps {
  badge: Badge;
  classImgName?: string;
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

export const BadgeCardDetailed = ({ badge, classImgName }: BadgeCardProps) => {
  return (
    <div className={styles.badgeCardWrapper}>
      <div className={classImgName}>
        <BadgeCard badge={badge} />
      </div>
      <div className={styles.badgeInfo}>
        <h1>{badge.name}</h1>
        <p style={{ color: TierColors[badge.tier] }}>RANK {badge.tier}</p>
      </div>
    </div>
  );
};

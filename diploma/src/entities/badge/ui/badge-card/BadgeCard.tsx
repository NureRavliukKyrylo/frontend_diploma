import { motion } from "framer-motion";
import { TierColors, type Badge } from "../../model";
import styles from "./BadgeCard.module.scss";

export interface BadgeCardProps {
  badge: Badge;
  classImgName?: string;
  onClick?: () => void;
}

export const BadgeCard = ({ badge }: BadgeCardProps) => {
  return (
    <div
      className={`${styles.badgeImageBlock} ${!badge.isUnlocked ? styles.locked : ""}`}
      style={{ backgroundImage: `url(${badge.iconUrl})` }}
    >
      <div
        className={styles.badgeInfoTier}
        style={{ color: TierColors[badge.rank] }}
      >
        <h1>{badge.rank}</h1>
      </div>
    </div>
  );
};

export const BadgeCardDetailed = ({
  badge,
  classImgName = "",
  onClick,
}: BadgeCardProps) => {
  const Wrapper = onClick ? motion.div : "div";

  return (
    <div className={styles.badgeCardWrapper}>
      <Wrapper
        className={`${classImgName}${onClick ? ` ${styles.interactive}` : ""}`}
        onClick={onClick}
        {...(onClick && {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { duration: 0.2, ease: "easeInOut" },
        })}
      >
        <BadgeCard badge={badge} />
      </Wrapper>
      <div className={styles.badgeInfo}>
        <h1>{badge.title}</h1>
        <p style={{ color: TierColors[badge.rank] }}>RANK {badge.rank}</p>
      </div>
    </div>
  );
};

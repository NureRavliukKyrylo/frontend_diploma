import { motion } from "framer-motion";
import { TierColors, type Badge } from "../../model";
import styles from "./BadgeCard.module.scss";
import { LockedIcon } from "@shared/assets/icons/info";

export interface BadgeCardProps {
  badge: Badge;
  classImgName?: string;
  onClick?: () => void;
}

export const BadgeCard = ({ badge }: BadgeCardProps) => {
  console.log(badge.isUnlocked);
  return (
    <div
      className={styles.badgeImageBlock}
      style={{ backgroundImage: `url(${badge.iconUrl})` }}
    >
      <div
        className={styles.badgeInfoTier}
        style={{ color: TierColors[badge.rank.name] }}
      >
        <h1>{badge.rank.name}</h1>
      </div>
      {badge.isUnlocked === false && (
        <div className={styles.lockedOverlay}>
          <LockedIcon />
        </div>
      )}
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
        <p style={{ color: TierColors[badge.rank.name] }}>
          RANK {badge.rank.name}
        </p>
      </div>
    </div>
  );
};

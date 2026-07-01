import { motion } from "framer-motion";
import { TierColors } from "../../model";
import type { Tier } from "../../model/types/tier/TierList";
import styles from "./BadgeCard.module.scss";
import { LockedIcon } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";

export interface BadgeCardModel {
  id: string;
  title: string;
  iconUrl: string;
  rank: { name: Tier };
  isUnlocked: boolean;
}

export interface BadgeCardProps {
  badge: BadgeCardModel;
  classImgName?: string;
  onClick?: () => void;
}

export const BadgeCard = ({ badge }: BadgeCardProps) => {
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
  const { t } = useTranslation(["badge"]);
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
          {t("badge:labels.rank", { rank: badge.rank.name })}
        </p>
      </div>
    </div>
  );
};

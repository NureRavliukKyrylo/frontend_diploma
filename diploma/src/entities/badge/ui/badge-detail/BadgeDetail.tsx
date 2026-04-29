import { ReadMoreButton } from "@shared/ui/buttons";
import { TierColors, type Badge } from "../../model";
import styles from "./BadgeDetail.module.scss";
import { formatDateToText } from "@shared/libs/date";
import { Stars } from "@shared/ui/stars";
import { TierOrder } from "@entities/badge/model/types/tier/TierList";
import { ProgressBar } from "@shared/ui";

interface BadgeDetailProps {
  badge: Badge;
}

export const BadgeDetail = ({ badge }: BadgeDetailProps) => {
  return (
    <>
      <img src={badge.iconUrl} alt="badge-image" />
      <div className={styles.badgeDetailInfo}>
        <div className={styles.headerInfo}>
          <h1>{badge.title}</h1>
          <h2 style={{ color: TierColors[badge.rank] }}>Rank {badge.rank}</h2>
        </div>
        <div className={styles.middleInfo}>
          <ReadMoreButton collapsedHeight={80}>
            <p>{badge.description}</p>
          </ReadMoreButton>
          <div className={styles.metaInfo}>
            <div className={styles.receivedAll}>
              <div className={styles.titleInfo}>
                <h1>Volunteers </h1>
                <h2>received</h2>
              </div>
              <p>{badge.awardedCountTotal}</p>
            </div>
            <div className={styles.earnedOn}>
              <div className={styles.titleInfo}>
                <h1>Volunteers </h1>
                <h2>received</h2>
              </div>
              <p>{formatDateToText(badge.firstAwardedAt)}</p>
            </div>
          </div>
          <div className={styles.rarityBlock}>
            <h1>RARITY</h1>
            <Stars
              value={TierOrder[badge.rank]}
              maxStars={Object.keys(TierOrder).length}
            />
          </div>
        </div>
        <div className={styles.bottomInfo}>
          <div className={styles.progressBlock}>
            <h1>Progress</h1>
            <ProgressBar current={badge.progressPercent} max={100} />
            <h2>
              {badge.progressPercent === 100
                ? `Your dedication has filled the bar — you’ve officially earned the ${(<span>${badge.title}</span>)} badge!`
                : `You've got ${100 - badge.progressPercent}% to get ${badge.title} badge in your inventory. Keep it up! `}
            </h2>
          </div>
          <div className={styles.requirementsBadge}>
            {badge.ruleProgress.map((value) => (
              <h1>""{value.label}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

import { ReadMoreButton } from "@shared/ui/buttons";
import styles from "./BadgeDetailWidget.module.scss";
import { formatDateToText } from "@shared/libs/date";
import { Stars } from "@shared/ui/stars";
import { TierOrder } from "@entities/badge/model/types/tier/TierList";
import { ProgressBar } from "@shared/ui";
import { badgesQuery, TierColors } from "@entities/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShareBadgeButton } from "@features/badge";

export const BadgeDetailWidget = ({ id }: { id: string }) => {
  const { data: badge } = useSuspenseQuery(badgesQuery.id(id));

  return (
    <>
      <div className={styles.imageWrapper}>
        <img className={styles.iconUrl} src={badge.iconUrl} alt="badge-image" />
      </div>
      <div className={styles.badgeDetailInfo}>
        <div className={styles.headerInfo}>
          <div className={styles.shareTitleWrapper}>
            <h1>{badge.title}</h1>
            {badge.isUnlocked && (
              <ShareBadgeButton
                text={`I've got the ${badge.title} badge on ImpactFlow!`}
                pageUrl={`https://impactflow.com/badges/${badge.id}`}
              />
            )}
          </div>

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
                <h1>First </h1>
                <h2>Earned on</h2>
              </div>
              <p>{formatDateToText(badge.firstAwardedAt)}</p>
            </div>
          </div>
          <div className={styles.rarityBlock}>
            <h1>RARITY</h1>
            <Stars
              value={TierOrder[badge.rank]}
              maxStars={Object.keys(TierOrder).length}
              classNameStar={styles.rarityStar}
            />
          </div>
        </div>
        <div className={styles.bottomInfo}>
          <div className={styles.progressBlock}>
            <h1>Progress</h1>
            <ProgressBar current={badge.progressPercent} max={100} />
            <h2>
              {badge.progressPercent === 100 ? (
                <>
                  Your dedication has filled the bar — you've officially earned
                  the <span>{badge.title}</span> badge!
                </>
              ) : (
                <>
                  You've got {100 - badge.progressPercent}% to get{" "}
                  <span>{badge.title}</span> badge in your inventory. Keep it
                  up!
                </>
              )}
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

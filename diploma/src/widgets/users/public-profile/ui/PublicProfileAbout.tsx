import { useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  PublicProfileProgress,
  PublicProfileRating,
} from "@entities/user/profile";
import { useElementOverflow } from "@shared/libs/hooks";
import { ProfileSectionCard } from "./ProfileSectionCard";
import styles from "./PublicProfileAbout.module.scss";

interface PublicProfileAboutProps {
  bio: string | null;
  progress: PublicProfileProgress;
  rating: PublicProfileRating;
}

export const PublicProfileAbout = ({
  bio,
  progress,
  rating,
}: PublicProfileAboutProps) => {
  const { t } = useTranslation("common");
  const [isExpanded, setIsExpanded] = useState(false);
  const { elementRef, isOverflowing } = useElementOverflow<HTMLParagraphElement>(
    112,
    `${bio}-${isExpanded}`,
  );
  const level = progress.level ?? 1;
  const progressPercent = progress.isMaxLevel
    ? 100
    : Math.max(0, Math.min(100, progress.percent));

  return (
    <ProfileSectionCard title={t("publicProfile.sections.about")}>
      <div className={styles.summary}>
        <div className={styles.progress}>
          <div className={styles.progressHeader}>
            <h3>{t("publicProfile.about.level", { level })}</h3>
            <strong>
              {progress.currentProgress}/{progress.maxProgress || 0}
            </strong>
          </div>
          <div className={styles.track}>
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <div className={styles.hints}>
            <span>
              {progress.isMaxLevel
                ? t("publicProfile.about.maximumLevel")
                : t("publicProfile.about.nextLevel")}
            </span>
            <span>
              {t("publicProfile.about.level", {
                level: progress.isMaxLevel ? level : level + 1,
              })}
            </span>
          </div>
        </div>
        <div className={styles.rating}>
          <strong>{rating.value.toFixed(1)}</strong>
          <span>
            {t("publicProfile.about.votes", { count: rating.totalVotes })}
          </span>
        </div>
      </div>

      <div className={styles.bio}>
        <p
          ref={elementRef}
          className={!isExpanded && isOverflowing ? styles.collapsed : ""}
        >
          {bio?.trim() || t("publicProfile.about.emptyBio")}
        </p>
        {(isOverflowing || isExpanded) && (
          <button type="button" onClick={() => setIsExpanded((value) => !value)}>
            {isExpanded
              ? t("publicProfile.actions.showLess")
              : t("publicProfile.actions.readMore")}
          </button>
        )}
      </div>
    </ProfileSectionCard>
  );
};

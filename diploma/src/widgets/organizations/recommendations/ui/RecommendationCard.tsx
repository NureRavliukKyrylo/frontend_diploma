import { Bolt, Crown, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { VolunteerRecommendation } from "@entities/recommendation";
import { MatchBreakdown } from "./MatchBreakdown";
import { MatchedSkills } from "./MatchedSkills";
import { RecommendationActions } from "./RecommendationActions";
import { RecommendationSignals } from "./RecommendationSignals";
import { ScoreRing } from "./ScoreRing";
import styles from "./RecommendationCard.module.scss";

interface RecommendationCardProps {
  recommendation: VolunteerRecommendation;
  matchedSkillNames: string[];
  isTopMatch: boolean;
  isInvited: boolean;
  onInvite: (recommendation: VolunteerRecommendation) => void;
  onProfile: () => void;
}

export const RecommendationCard = ({
  recommendation,
  matchedSkillNames,
  isTopMatch,
  isInvited,
  onInvite,
  onProfile,
}: RecommendationCardProps) => {
  const { t } = useTranslation("organizations");
  const reason =
    recommendation.reasons[0] ||
    t("recommendations.card.suggestedFallback");

  return (
    <article className={styles.card}>
      <div
        className={`${styles.topStrip} ${
          recommendation.hasActivePriorityBoost ? styles.topStripBoosted : ""
        }`}
      />
      <div
        className={`${styles.cardDecoPrimary} ${
          recommendation.hasActivePriorityBoost
            ? styles.cardDecoPrimaryBoosted
            : ""
        }`}
      />
      <div className={styles.cardDecoSecondary} />

      {recommendation.hasActivePriorityBoost && (
        <div className={styles.boostedPin}>
          <Bolt size={13} fill="currentColor" />
          {t("recommendations.card.boosted")}
        </div>
      )}
      {isTopMatch && (
        <div className={styles.topMatchPin}>
          <Crown size={13} />
          {t("recommendations.card.rank", { rank: 1 })}
        </div>
      )}

      <div className={styles.cardBody}>
        <div
          className={styles.profileArea}
          onClick={onProfile}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onProfile();
            }
          }}
          role="link"
          tabIndex={0}
          aria-label={t("recommendations.card.viewProfile", {
            name: recommendation.displayName,
          })}
        >
          <ScoreRing
            score={recommendation.score}
            avatarUrl={recommendation.avatarUrl}
            displayName={recommendation.displayName}
          />

          <div className={styles.identity}>
            <h2>{recommendation.displayName}</h2>
            <div className={styles.reason}>
              <Sparkles size={13} />
              <span>{reason}</span>
            </div>
          </div>

          <MatchedSkills skillNames={matchedSkillNames} />
        </div>
        <RecommendationSignals breakdown={recommendation.breakdown} />
        <MatchBreakdown breakdown={recommendation.breakdown} />

        <RecommendationActions
          userId={recommendation.userId}
          displayName={recommendation.displayName}
          isInvited={isInvited}
          onInvite={() => onInvite(recommendation)}
        />
      </div>
    </article>
  );
};

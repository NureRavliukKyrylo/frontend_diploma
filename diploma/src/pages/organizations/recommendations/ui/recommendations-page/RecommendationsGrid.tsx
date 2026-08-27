import type { VolunteerRecommendation } from "@entities/recommendation";
import { motion } from "framer-motion";
import { RecommendationCard } from "@widgets/organizations/recommendations";
import styles from "./RecommendationsGrid.module.scss";

interface RecommendationsGridProps {
  recommendations: VolunteerRecommendation[];
  invitedIds: Set<string>;
  skillNamesById: Map<string, string>;
  onInvite: (recommendation: VolunteerRecommendation) => void;
  onProfile: (recommendation: VolunteerRecommendation) => void;
}

export const RecommendationsGrid = ({
  recommendations,
  invitedIds,
  skillNamesById,
  onInvite,
  onProfile,
}: RecommendationsGridProps) => (
  <div className={styles.grid}>
    {recommendations.map((recommendation, index) => (
      <motion.div
        key={recommendation.userId}
        className={styles.gridItem}
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.55,
          delay: index * 0.06,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <RecommendationCard
          recommendation={recommendation}
          matchedSkillNames={recommendation.matchedSkillIds
            .map((skillId) => skillNamesById.get(skillId))
            .filter((name): name is string => Boolean(name))}
          isTopMatch={index === 0}
          isInvited={invitedIds.has(recommendation.userId)}
          onInvite={onInvite}
          onProfile={() => onProfile(recommendation)}
        />
      </motion.div>
    ))}
  </div>
);

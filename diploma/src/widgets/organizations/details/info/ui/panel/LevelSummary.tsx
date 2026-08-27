import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { OrganizationDetailsAnimationConfig } from "../../lib/animation";
import styles from "./LevelSummary.module.scss";

interface LevelSummaryProps {
  level: number;
  levelCurrent: number;
  levelMax: number;
  levelProgressPercent: number;
  levelNext: number;
  rating: number;
  votes: number;
  animation: OrganizationDetailsAnimationConfig;
}

export const LevelSummary = ({
  level,
  levelCurrent,
  levelMax,
  levelProgressPercent,
  levelNext,
  rating,
  votes,
  animation,
}: LevelSummaryProps) => {
  const { t } = useTranslation("organizations");
  const { prefersReducedMotion, summaryVariants, sideRevealVariants } =
    animation;

  return (
    <motion.div
      className={styles.levelSummary}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={summaryVariants}
    >
      <div className={styles.levelMain}>
        <div className={styles.levelHeader}>
          <h2>{t("details.labels.level", { level })}</h2>
          <div className={styles.levelValue}>
            {levelMax > 0 ? `${levelCurrent}/${levelMax}` : levelCurrent}
          </div>
        </div>

        <div className={styles.levelProgressTrack}>
          <motion.div
            className={styles.levelProgressFill}
            initial={
              prefersReducedMotion
                ? { width: `${levelProgressPercent}%` }
                : { width: 0 }
            }
            whileInView={{ width: `${levelProgressPercent}%` }}
            viewport={{ once: true, amount: 0.8 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 110,
                    damping: 20,
                    mass: 0.9,
                    delay: 0.08,
                  }
            }
          />
        </div>

        <div className={styles.levelProgressHints}>
          <span>{t("details.labels.nextLevel")}</span>
          <span>{t("details.labels.level", { level: levelNext })}</span>
        </div>
      </div>

      <motion.div className={styles.ratingBlock} variants={sideRevealVariants}>
        <strong>{rating.toFixed(1)}</strong>
        <span>{t("details.labels.votes", { count: votes })}</span>
      </motion.div>
    </motion.div>
  );
};

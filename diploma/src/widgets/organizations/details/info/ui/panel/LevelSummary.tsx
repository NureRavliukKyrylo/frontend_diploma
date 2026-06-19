import { motion } from "framer-motion";
import type { OrganizationDetailsAnimationConfig } from "../../lib/animation";
import styles from "./LevelSummary.module.scss";

interface LevelSummaryProps {
  level: number;
  levelCurrent: number;
  levelNext: number;
  rating: number;
  votes: number;
  animation: OrganizationDetailsAnimationConfig;
}

export const LevelSummary = ({
  level,
  levelCurrent,
  levelNext,
  rating,
  votes,
  animation,
}: LevelSummaryProps) => {
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
          <h2>Level {level}</h2>
          <div className={styles.levelValue}>{levelCurrent}/100</div>
        </div>

        <div className={styles.levelProgressTrack}>
          <motion.div
            className={styles.levelProgressFill}
            initial={
              prefersReducedMotion ? { width: `${levelCurrent}%` } : { width: 0 }
            }
            whileInView={{ width: `${levelCurrent}%` }}
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
          <span>Next level</span>
          <span>Level {levelNext}</span>
        </div>
      </div>

      <motion.div className={styles.ratingBlock} variants={sideRevealVariants}>
        <strong>{rating.toFixed(1)}</strong>
        <span>({votes} votes)</span>
      </motion.div>
    </motion.div>
  );
};

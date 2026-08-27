import { motion } from "framer-motion";
import type {
  LandingActivitiesContent,
  LandingAnimations,
} from "../../model/types";
import styles from "./LandingActivities.module.scss";

interface LandingActivitiesProps {
  content: LandingActivitiesContent;
  animations: Pick<
    LandingAnimations,
    | "sectionVariants"
    | "sectionViewport"
    | "cardListVariants"
    | "cardVariants"
  >;
}

export const LandingActivities = ({
  content,
  animations,
}: LandingActivitiesProps) => (
  <>
    <motion.section
      id="activities"
      className={styles.section}
      variants={animations.sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={animations.sectionViewport}
    >
      <div className={styles.sectionHeader}>
        <p className={styles.sectionTag}>{content.activitiesTag}</p>
        <h2>{content.activitiesTitle}</h2>
      </div>
      <motion.div
        className={styles.activityGrid}
        variants={animations.cardListVariants}
        initial="hidden"
        whileInView="visible"
        viewport={animations.sectionViewport}
      >
        {content.activities.map(
          ({ Icon, title, subtitle, description, tag }) => (
            <motion.article
              key={title}
              className={styles.activityCard}
              variants={animations.cardVariants}
            >
              <div className={styles.iconBox}>
                <Icon size={28} strokeWidth={2.1} aria-hidden="true" />
              </div>
              <span className={styles.cardTag}>{tag}</span>
              <h3>{title}</h3>
              <h4>{subtitle}</h4>
              <p>{description}</p>
            </motion.article>
          ),
        )}
      </motion.div>
    </motion.section>
    <motion.section
      id="gamification"
      className={styles.gamificationSection}
      variants={animations.sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={animations.sectionViewport}
    >
      <div className={styles.sectionHeader}>
        <p className={styles.sectionTag}>{content.gamificationTag}</p>
        <h2>{content.gamificationTitle}</h2>
      </div>
      <motion.div
        className={styles.gamificationGrid}
        variants={animations.cardListVariants}
        initial="hidden"
        whileInView="visible"
        viewport={animations.sectionViewport}
      >
        {content.gamification.map(({ Icon, title, description }) => (
          <motion.article
            key={title}
            className={styles.gamificationCard}
            variants={animations.cardVariants}
          >
            <Icon size={32} strokeWidth={2.1} aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  </>
);

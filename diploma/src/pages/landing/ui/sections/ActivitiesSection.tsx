import { motion } from "framer-motion";
import { activityTypes } from "../../config/landingContent";
import {
  cardListVariants,
  cardVariants,
  sectionVariants,
  sectionViewport,
} from "../../lib/animations";
import styles from "./ActivitiesSection.module.scss";

export const ActivitiesSection = () => (
  <motion.section
    id="activities"
    className={styles.section}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
  >
    <div className={styles.sectionHeader}>
      <p className={styles.sectionTag}>Activities</p>
      <h2>Three ways to make an impact</h2>
    </div>

    <motion.div
      className={styles.activityGrid}
      variants={cardListVariants}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      {activityTypes.map(({ Icon, title, subtitle, description, tag }) => (
        <motion.article
          key={title}
          className={styles.activityCard}
          variants={cardVariants}
        >
          <div className={styles.iconBox}>
            <Icon size={28} strokeWidth={2.1} aria-hidden="true" />
          </div>
          <span className={styles.cardTag}>{tag}</span>
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <p>{description}</p>
        </motion.article>
      ))}
    </motion.div>
  </motion.section>
);

import { motion } from "framer-motion";
import { gamificationItems } from "../../config/landingContent";
import {
  cardListVariants,
  cardVariants,
  sectionVariants,
  sectionViewport,
} from "../../lib/animations";
import styles from "./GamificationSection.module.scss";

export const GamificationSection = () => (
  <motion.section
    id="gamification"
    className={styles.gamificationSection}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
  >
    <div className={styles.sectionHeader}>
      <p className={styles.sectionTag}>Gamification</p>
      <h2>Progress that means something</h2>
    </div>

    <motion.div
      className={styles.gamificationGrid}
      variants={cardListVariants}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      {gamificationItems.map(({ Icon, title, description }) => (
        <motion.article
          key={title}
          className={styles.gamificationCard}
          variants={cardVariants}
        >
          <Icon size={32} strokeWidth={2.1} aria-hidden="true" />
          <h3>{title}</h3>
          <p>{description}</p>
        </motion.article>
      ))}
    </motion.div>
  </motion.section>
);

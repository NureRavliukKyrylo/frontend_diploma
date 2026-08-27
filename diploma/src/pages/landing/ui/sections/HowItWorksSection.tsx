import { motion } from "framer-motion";
import { steps } from "../../config/landingContent";
import {
  cardListVariants,
  cardVariants,
  sectionVariants,
  sectionViewport,
} from "../../lib/animations";
import styles from "./HowItWorksSection.module.scss";

export const HowItWorksSection = () => (
  <motion.section
    id="how-it-works"
    className={styles.section}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={sectionViewport}
  >
    <div className={styles.sectionHeader}>
      <p className={styles.sectionTag}>How it works</p>
      <h2>Three steps to your first mission</h2>
    </div>

    <motion.div
      className={styles.stepsGrid}
      variants={cardListVariants}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      {steps.map((step) => (
        <motion.article
          key={step.number}
          className={styles.stepCard}
          variants={cardVariants}
        >
          <span className={styles.stepNumber}>{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </motion.article>
      ))}
    </motion.div>
  </motion.section>
);

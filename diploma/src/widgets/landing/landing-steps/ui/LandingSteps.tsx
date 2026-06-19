import { motion } from "framer-motion";
import type {
  LandingAnimations,
  LandingStepsContent,
} from "../../model/types";
import styles from "./LandingSteps.module.scss";

interface LandingStepsProps {
  content: LandingStepsContent;
  animations: Pick<
    LandingAnimations,
    | "sectionVariants"
    | "sectionViewport"
    | "cardListVariants"
    | "cardVariants"
  >;
}

export const LandingSteps = ({
  content,
  animations,
}: LandingStepsProps) => (
  <motion.section
    id="how-it-works"
    className={styles.section}
    variants={animations.sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={animations.sectionViewport}
  >
    <div className={styles.sectionHeader}>
      <p className={styles.sectionTag}>{content.tag}</p>
      <h2>{content.title}</h2>
    </div>
    <motion.div
      className={styles.stepsGrid}
      variants={animations.cardListVariants}
      initial="hidden"
      whileInView="visible"
      viewport={animations.sectionViewport}
    >
      {content.items.map((step) => (
        <motion.article
          key={step.number}
          className={styles.stepCard}
          variants={animations.cardVariants}
        >
          <span className={styles.stepNumber}>{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </motion.article>
      ))}
    </motion.div>
  </motion.section>
);

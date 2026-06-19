import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { typewriterWords } from "../../../config/landingContent";
import {
  bounceVariant,
  heroContainerVariants,
  heroItemVariants,
} from "../../../lib/animations";
import { useTypewriter } from "../../../model/useTypewriter";
import styles from "./HeroContent.module.scss";

export const HeroContent = () => {
  const typewriterText = useTypewriter(typewriterWords);

  const handleScrollToStats = () => {
    document.getElementById("stats")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.div
      className={styles.heroContent}
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.animatedTag} variants={heroItemVariants}>
        <span className={styles.pulseDot} />
        <span>{typewriterText}</span>
        <span className={styles.cursor}>|</span>
      </motion.div>
      <motion.h1 className={styles.heroTitle} variants={heroItemVariants}>
        Your time{" "}
        <span className={styles.heroTitleKeep}>
          changes <span className={styles.heroTitleAccent}>the world</span>
        </span>
      </motion.h1>
      <motion.p className={styles.heroSubtitle} variants={heroItemVariants}>
        Join missions, earn experience, exchange your time. ImpactFlow turns
        volunteering into a meaningful journey with real impact.
      </motion.p>
      <motion.div variants={heroItemVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/auth" className={styles.primaryCta}>
            Start Your Mission
          </Link>
        </motion.div>
      </motion.div>
      <motion.button
        type="button"
        className={styles.scrollHint}
        variants={bounceVariant}
        animate="animate"
        onClick={handleScrollToStats}
      >
        <span>Scroll to explore</span>
        <ArrowDown size={14} aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
};

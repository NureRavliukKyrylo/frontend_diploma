import { motion } from "framer-motion";
import type { CommunityRule } from "../../config/termsData";
import styles from "./TermsRules.module.scss";

interface TermsRulesProps {
  rules: readonly CommunityRule[];
}

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const ruleVariants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export const TermsRules = ({ rules }: TermsRulesProps) => (
  <motion.section
    id="community-rules"
    className={styles.rules}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <p className={styles.sectionNum}>09 — Community rules</p>
    <h2
      className={styles.title}
      data-terms-section-heading="community-rules"
    >
      Community rules at a glance
    </h2>

    <motion.div
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {rules.map(rule => (
        <motion.div
          key={rule.id}
          className={styles.rule}
          variants={ruleVariants}
        >
          <div className={styles.dot} aria-hidden="true" />
          <div className={styles.ruleText}>{rule.text}</div>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

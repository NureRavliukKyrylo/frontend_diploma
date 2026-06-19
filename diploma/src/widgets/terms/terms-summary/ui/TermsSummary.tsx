import { motion } from "framer-motion";
import { IconBolt } from "@tabler/icons-react";
import styles from "./TermsSummary.module.scss";

export const TermsSummary = () => (
  <motion.section
    className={styles.summary}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
  >
    <div className={styles.icon}>
      <IconBolt aria-hidden="true" />
    </div>
    <div className={styles.textBlock}>
      <p className={styles.label}>Plain-language summary</p>
      <p className={styles.text}>
        Use ImpactFlow for <strong>genuine volunteering only</strong>. Respect
        other users and organizations. Do not abuse the Time Bank or
        gamification systems. Accounts that violate these terms{" "}
        <strong>may be suspended without notice</strong>.
      </p>
    </div>
  </motion.section>
);

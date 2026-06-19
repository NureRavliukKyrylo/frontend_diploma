import { motion } from "framer-motion";
import clsx from "clsx";
import type { TermsSectionData } from "../../config/termsData";
import styles from "./TermsSections.module.scss";

export const TermsSection = ({
  id,
  num,
  navLabel,
  title,
  paragraphs,
  badge,
}: TermsSectionData) => (
  <motion.section
    id={id}
    className={styles.section}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    <p className={styles.sectionNum}>
      {num} — {navLabel}
    </p>
    <h2 className={styles.sectionTitle} data-terms-section-heading={id}>
      {title}
    </h2>

    <div className={styles.sectionText}>
      {paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>

    {badge && (
      <span
        className={clsx(styles.badge, {
          [styles.badgeImportant]: badge.variant === "important",
          [styles.badgeNeutral]: badge.variant === "neutral",
        })}
      >
        {badge.text}
      </span>
    )}
  </motion.section>
);

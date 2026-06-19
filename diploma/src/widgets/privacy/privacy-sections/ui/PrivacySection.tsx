import { motion } from "framer-motion";
import {
  IconDownload,
  IconMail,
  IconSettings,
  type Icon,
} from "@tabler/icons-react";
import type { PrivacySection as PrivacySectionData } from "../../config/privacyData";
import styles from "./PrivacySections.module.scss";

const actionIcons: Record<string, Icon> = {
  IconDownload,
  IconMail,
  IconSettings,
};

export const PrivacySection = ({
  id,
  num,
  navLabel,
  title,
  paragraphs,
  callout,
  chips,
  actions,
}: PrivacySectionData) => (
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
    <h2
      className={styles.sectionTitle}
      data-privacy-section-heading={id}
    >
      {title}
    </h2>

    <div className={styles.sectionText}>
      {paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>

    {callout && <div className={styles.callout}>{callout}</div>}

    {chips && (
      <div className={styles.chips}>
        {chips.map(chip => (
          <span key={chip} className={styles.chip}>
            {chip}
          </span>
        ))}
      </div>
    )}

    {actions && (
      <div className={styles.actions}>
        {actions.map(action => {
          const ActionIcon = actionIcons[action.icon];

          return (
            <motion.button
              key={action.label}
              type="button"
              className={
                action.variant === "primary"
                  ? styles.btnPrimary
                  : styles.btnOutline
              }
              whileTap={{ scale: 0.97 }}
            >
              {ActionIcon && <ActionIcon size={18} aria-hidden="true" />}
              {action.label}
            </motion.button>
          );
        })}
      </div>
    )}
  </motion.section>
);

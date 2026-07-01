import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LayoutCard } from "@shared/assets/images/layout";
import type { OrganizationDetailsAnimationConfig } from "../../lib/animation";
import styles from "./ProjectHighlights.module.scss";

interface ProjectHighlightsProps {
  activeProjects: number;
  completedProjects: number;
  animation: OrganizationDetailsAnimationConfig;
  onScrollToProjects: () => void;
}

export const ProjectHighlights = ({
  activeProjects,
  completedProjects,
  animation,
  onScrollToProjects,
}: ProjectHighlightsProps) => {
  const { t } = useTranslation("organizations");
  const {
    prefersReducedMotion,
    nestedContainerVariants,
    blockVariants,
    subtleHover,
    buttonHover,
  } = animation;

  return (
    <motion.div
      className={styles.highlightsGrid}
      variants={nestedContainerVariants}
    >
      <div className={styles.summaryColumn}>
        <motion.article
          className={styles.metricCard}
          variants={blockVariants}
          whileHover={subtleHover}
        >
          <div className={styles.metricLabel}>
            <span className={styles.metricLead}>
              {t("details.highlights.active")}
            </span>
            <span className={styles.metricTitle}>
              {t("details.highlights.projects")}
            </span>
          </div>
          <strong>{activeProjects}</strong>
        </motion.article>

        <motion.article
          className={styles.metricCard}
          variants={blockVariants}
          whileHover={subtleHover}
        >
          <div className={styles.metricLabel}>
            <span className={styles.metricLead}>
              {t("details.highlights.completed")}
            </span>
            <span className={styles.metricTitle}>
              {t("details.highlights.projects")}
            </span>
          </div>
          <strong>{completedProjects}</strong>
        </motion.article>
      </div>

      <motion.div
        className={styles.patternCard}
        variants={blockVariants}
        whileHover={subtleHover}
      >
        <img
          src={LayoutCard}
          alt=""
          aria-hidden="true"
          className={styles.patternBackground}
        />
        <motion.button
          type="button"
          onClick={onScrollToProjects}
          whileHover={buttonHover}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
        >
          {t("details.actions.seeMore")}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

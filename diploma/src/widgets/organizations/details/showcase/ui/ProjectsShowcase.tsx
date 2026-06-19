import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Arrow } from "@shared/assets/icons/actions";
import { OrganizationDetailsEmptyState } from "../../shared/empty-state/ui/EmptyState";
import type { ProjectPreviewCardData } from "../lib/helpers";
import {
  carouselFrameVariants,
  carouselGridVariants,
  surfaceVariants,
} from "../lib/animation";
import styles from "./ProjectsShowcase.module.scss";

interface OrganizationProjectsShowcaseProps {
  visibleProjects: ProjectPreviewCardData[];
  isLoading: boolean;
  showCarouselControls: boolean;
  carouselOffset: number;
  carouselDirection: 1 | -1;
  prefersReducedMotion: boolean;
  onShiftCarousel: (direction: 1 | -1) => void;
}

export const OrganizationProjectsShowcase = ({
  visibleProjects,
  isLoading,
  showCarouselControls,
  carouselOffset,
  carouselDirection,
  prefersReducedMotion,
  onShiftCarousel,
}: OrganizationProjectsShowcaseProps) => {
  if (isLoading) {
    return (
      <motion.div className={styles.previewShowcase} variants={surfaceVariants}>
        <div className={styles.previewGrid}>
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className={styles.previewCardSkeleton} />
          ))}
        </div>
      </motion.div>
    );
  }

  if (visibleProjects.length === 0) {
    return (
      <motion.div className={styles.previewShowcase} variants={surfaceVariants}>
        <div className={styles.previewEmptyState}>
          <OrganizationDetailsEmptyState />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className={styles.previewShowcase} variants={surfaceVariants}>
      <div className={styles.previewRow}>
        {showCarouselControls ? (
          <motion.button
            type="button"
            className={`${styles.carouselArrow} ${styles.leftArrow}`}
            onClick={() => onShiftCarousel(-1)}
            aria-label="Previous projects"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04, x: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          >
            <Arrow aria-hidden="true" />
          </motion.button>
        ) : null}
        <div className={styles.previewViewport}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={carouselOffset}
              className={styles.previewGrid}
              variants={carouselGridVariants}
              custom={carouselDirection}
              initial={prefersReducedMotion ? "center" : "enter"}
              animate="center"
              exit={prefersReducedMotion ? "center" : "exit"}
            >
              {visibleProjects.map((project) => (
                <motion.article
                  key={project.id}
                  className={styles.previewCard}
                  variants={carouselFrameVariants}
                  custom={carouselDirection}
                >
                  <div className={styles.previewContent}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className={styles.previewFooter}>
                    <div className={styles.progressMeta}>
                      <span>{project.tasksLabel}</span>
                      <strong>{project.progressLabel}</strong>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${project.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {showCarouselControls ? (
          <motion.button
            type="button"
            className={`${styles.carouselArrow} ${styles.rightArrow}`}
            onClick={() => onShiftCarousel(1)}
            aria-label="Next projects"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.04, x: 2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          >
            <Arrow aria-hidden="true" />
          </motion.button>
        ) : null}
      </div>

      <motion.div className={styles.seeMoreRow} variants={surfaceVariants}>
        <Link
          to="/activities"
          className={styles.seeMoreButton}
        >
          SEE MORE
        </Link>
      </motion.div>
    </motion.div>
  );
};

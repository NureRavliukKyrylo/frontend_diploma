import { motion, type TargetAndTransition } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { OrganizationCategoryCarouselItem } from "../model/categoryCarouselTypes";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridCardProps {
  category: OrganizationCategoryCarouselItem;
  subtleHover?: TargetAndTransition;
  buttonHover: TargetAndTransition;
  prefersReducedMotion: boolean;
}

export const CategoryGridCard = ({
  category,
  subtleHover,
  buttonHover,
  prefersReducedMotion,
}: CategoryGridCardProps) => (
  <motion.article
    className={styles.categoryCard}
    whileHover={subtleHover}
  >
    <div
      className={`${styles.categoryVisual} ${styles[`tone${category.tone}`]}`}
      aria-hidden="true"
    >
      {category.imageSrc ? (
        <img
          src={category.imageSrc}
          alt=""
          className={styles.categoryPreviewImage}
        />
      ) : (
        <div className={styles.categoryIcon}>
          {category.title.charAt(0) || "C"}
        </div>
      )}
    </div>

    <div className={styles.categoryBody}>
      <h4>{category.title}</h4>
    </div>

    <div className={styles.categoryFooter}>
      <div className={styles.categoryStats}>
        <div className={styles.categoryStat}>
          <strong>{category.totalActivities.toLocaleString("en-US")}</strong>
          <span>All activities</span>
        </div>
        <div className={styles.categoryStat}>
          <strong>{category.activeActivities.toLocaleString("en-US")}</strong>
          <span>Active activities</span>
        </div>
      </div>

      <motion.button
        type="button"
        className={styles.categoryAction}
        aria-label={`Category action for ${category.title}`}
        whileHover={prefersReducedMotion ? undefined : buttonHover}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      >
        <ArrowRight aria-hidden="true" />
      </motion.button>
    </div>
  </motion.article>
);

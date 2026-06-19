import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridSkeletonProps {
  cardCount: number;
  containerVariants: Variants;
}

export const CategoryGridSkeleton = ({
  cardCount,
  containerVariants,
}: CategoryGridSkeletonProps) => (
  <motion.section
    className={styles.categorySection}
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className={styles.carouselShell}>
      <div
        className={`${styles.carouselNavButton} ${styles.carouselNavButtonLeft} ${styles.carouselNavButtonDisabled}`}
      >
        <ChevronLeft aria-hidden="true" />
      </div>

      <div className={styles.carouselViewport}>
        <div className={styles.carouselTrack}>
          {Array.from({ length: cardCount }, (_, index) => (
            <div
              key={index}
              className={`${styles.categoryCard} ${styles.categoryCardSkeleton}`}
            >
              <div className={styles.skeletonVisual} />
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonStats}>
                <div className={styles.skeletonStat} />
                <div className={styles.skeletonStat} />
              </div>
              <div className={styles.skeletonAction} />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${styles.carouselNavButton} ${styles.carouselNavButtonRight} ${styles.carouselNavButtonDisabled}`}
      >
        <ChevronRight aria-hidden="true" />
      </div>
    </div>
  </motion.section>
);

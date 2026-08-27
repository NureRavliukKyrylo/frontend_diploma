import { AnimatePresence, motion, type Transition, type Variants } from "framer-motion";
import type { OrganizationDetailsAnimationConfig } from "../lib/animation";
import { useOrganizationCategoryCarousel } from "../model/useCategoryCarousel";
import { useCategoryGridCarousel } from "../model/useCategoryGridCarousel";
import { CategoryGridCard } from "./CategoryGridCard";
import { CategoryGridEmpty } from "./CategoryGridEmpty";
import { CategoryGridError } from "./CategoryGridError";
import { CategoryGridNavigationButton } from "./CategoryGridNavigationButton";
import { CategoryGridSkeleton } from "./CategoryGridSkeleton";
import styles from "./CategoryGrid.module.scss";

const CARDS_PER_GROUP = 4;

const groupVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

interface OrganizationDetailsCategoryGridProps {
  organizationId: string;
  animation: OrganizationDetailsAnimationConfig;
}

export const OrganizationDetailsCategoryGrid = ({
  organizationId,
  animation,
}: OrganizationDetailsCategoryGridProps) => {
  const { containerVariants, subtleHover, buttonHover, prefersReducedMotion } =
    animation;
  const {
    data: categoryCards = [],
    isPending,
    isError,
    error,
    refetch,
  } = useOrganizationCategoryCarousel(organizationId);
  const {
    activeGroupIndex,
    groupCount,
    visibleCards,
    isPrevDisabled,
    isNextDisabled,
    showPrevious,
    showNext,
  } = useCategoryGridCarousel(categoryCards, CARDS_PER_GROUP);

  const groupTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" };
  const hoverScale = buttonHover ?? { scale: 1.02, y: -1 };

  if (isPending) {
    return (
      <CategoryGridSkeleton
        cardCount={CARDS_PER_GROUP}
        containerVariants={containerVariants}
      />
    );
  }

  if (isError) {
    return (
      <CategoryGridError
        error={error}
        refetch={refetch}
        containerVariants={containerVariants}
        buttonHover={hoverScale}
        prefersReducedMotion={prefersReducedMotion}
      />
    );
  }

  if (categoryCards.length === 0) {
    return <CategoryGridEmpty containerVariants={containerVariants} />;
  }

  return (
    <>
      <motion.section
        className={styles.categorySection}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.carouselShell}>
          <CategoryGridNavigationButton
            direction="previous"
            disabled={isPrevDisabled}
            onClick={showPrevious}
            buttonHover={hoverScale}
            prefersReducedMotion={prefersReducedMotion}
          />

          <div className={styles.carouselViewport}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeGroupIndex}
                className={styles.carouselTrack}
                variants={groupVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={groupTransition}
              >
                {visibleCards.map((category, index) =>
                  category ? (
                    <CategoryGridCard
                      key={category.id}
                      category={category}
                      subtleHover={subtleHover}
                      buttonHover={hoverScale}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  ) : (
                    <div
                      key={`placeholder-${activeGroupIndex}-${index}`}
                      className={styles.categoryPlaceholder}
                      aria-hidden="true"
                    />
                  ),
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <CategoryGridNavigationButton
            direction="next"
            disabled={isNextDisabled}
            onClick={showNext}
            buttonHover={hoverScale}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <div className={styles.carouselIndicator}>
          <span className={styles.carouselPosition}>
            {activeGroupIndex + 1} / {groupCount}
          </span>
        </div>
      </motion.section>
    </>
  );
};

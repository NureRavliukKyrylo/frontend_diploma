import {
  BadgeCardDetailed,
  BadgeCardDetailedSkeleton,
  useMyBadgesQuery,
} from "@entities/badge";
import { BadgesListWidget } from "@widgets/badges";
import styles from "./ProfileInventoryTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeVariants,
  fadeDuration,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";

export const ProfileInventoryTab = () => {
  return (
    <div className={styles.inventoryWrapper}>
      <h1 className={styles.achievementsTitle}>Achievements</h1>
      <AnimatePresence mode="wait">
        <motion.div {...fadeVariants} transition={fadeDuration}>
          <Suspense
            fallback={
              <ListWidgetSkeleton
                renderSkeleton={() => <BadgeCardDetailedSkeleton />}
                className={styles.badgesProfileList}
                items={8}
              />
            }
          >
            <BadgesListWidget
              useBadgesQuery={useMyBadgesQuery()}
              className={styles.badgesProfileList}
              renderCard={(badge, index) => (
                <motion.div
                  custom={index + 1}
                  variants={staggeredCardVariantsNoHover}
                  initial="hidden"
                  animate="visible"
                >
                  <BadgeCardDetailed badge={badge} />
                </motion.div>
              )}
            />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

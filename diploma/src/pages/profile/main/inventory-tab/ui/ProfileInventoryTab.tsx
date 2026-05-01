import {
  BadgeCardDetailed,
  BadgeCardDetailedSkeleton,
  useMyBadgesInfiniteQuery,
} from "@entities/badge";
import {
  BadgeDetailWidget,
  BadgeDetailWidgetSkeleton,
  BadgesListWidget,
} from "@widgets/badges";
import styles from "./ProfileInventoryTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeVariants,
  fadeDuration,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { InventoryProfileSearchParams } from "@entities/user";
import { LoadMoreButton } from "@shared/ui/buttons";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "@tanstack/react-router";
import { BaseModal } from "@shared/ui/modals";

interface ProfileInventoryTabProps {
  search: InventoryProfileSearchParams;
}

export const ProfileInventoryTab = ({ search }: ProfileInventoryTabProps) => {
  const { badgeId, ...badgesSearch } = search;
  const navigate = useNavigate({ from: "/profile/" });
  const handleOpenBadge = (badgeId: string) => {
    navigate({
      search: (prev) => ({ ...prev, badgeId: badgeId }),
      resetScroll: false,
    });
  };
  const handleCloseBadge = () => {
    navigate({
      search: (prev) => ({ ...prev, badgeId: undefined }),
      resetScroll: false,
    });
  };
  console.log(badgesSearch);
  return (
    <div className={styles.inventoryWrapper}>
      <h1 className={styles.achievementsTitle}>Achievements</h1>
      <AnimatePresence mode="wait">
        <motion.div {...fadeVariants} transition={fadeDuration}>
          <ErrorBoundary
            fallbackRender={({ error }) => {
              return (
                <div className={styles.errorState}>
                  <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
                  <p className="errorHint">
                    Try reloading the page or come back later.
                  </p>
                </div>
              );
            }}
          >
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
                useBadgesQuery={useMyBadgesInfiniteQuery(badgesSearch)}
                className={styles.badgesProfileList}
                renderCard={(badge, index) => (
                  <motion.div
                    custom={index + 1}
                    variants={staggeredCardVariantsNoHover}
                    initial="hidden"
                    animate="visible"
                  >
                    <BadgeCardDetailed
                      key={badge.id}
                      onClick={() => handleOpenBadge(badge.id)}
                      classImgName={styles.interactiveBadge}
                      badge={badge}
                    />
                  </motion.div>
                )}
                renderPagination={({
                  fetchNextPage,
                  isFetchingNextPage,
                  hasNextPage,
                }) =>
                  hasNextPage && (
                    <LoadMoreButton
                      onClick={fetchNextPage}
                      isLoading={isFetchingNextPage}
                    />
                  )
                }
                renderEmpty={(badges) =>
                  badges.length === 0 ? (
                    <div className={styles.emptyState}>
                      <h2>No badges yet</h2>
                      <p>Be the first to join and make a difference</p>
                    </div>
                  ) : null
                }
              />
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>
      {badgeId && (
        <BaseModal
          isOpen={!!badgeId}
          maxWidth="1300px"
          onClose={handleCloseBadge}
          showClosed={false}
        >
          <ErrorBoundary
            fallbackRender={({ error }) => {
              return (
                <div className={styles.errorState}>
                  <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
                  <p className="errorHint">
                    Try reloading the page or come back later.
                  </p>
                </div>
              );
            }}
          >
            <Suspense
              fallback={
                <div className={styles.badgeDetailWrapper}>
                  <BadgeDetailWidgetSkeleton />
                </div>
              }
            >
              <div className={styles.badgeDetailWrapper}>
                <BadgeDetailWidget id={badgeId} />
              </div>
            </Suspense>
          </ErrorBoundary>
        </BaseModal>
      )}
    </div>
  );
};

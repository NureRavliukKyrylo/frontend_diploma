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
import { useTranslation } from "react-i18next";

interface ProfileInventoryTabProps {
  search: InventoryProfileSearchParams;
}

export const ProfileInventoryTab = ({ search }: ProfileInventoryTabProps) => {
  const { badgeId, ...badgesSearch } = search;
  const navigate = useNavigate({ from: "/profile/" });
  const { t } = useTranslation("profile");

  const handleOpenBadge = (badgeId: string) => {
    navigate({
      search: (prev) => ({ ...prev, badgeId }),
      resetScroll: false,
    });
  };

  const handleCloseBadge = () => {
    navigate({
      search: (prev) => ({ ...prev, badgeId: undefined }),
      resetScroll: false,
    });
  };

  return (
    <div className={styles.inventoryWrapper}>
      <h1 className={styles.achievementsTitle}>{t("inventory.title")}</h1>

      <AnimatePresence mode="wait">
        <motion.div {...fadeVariants} transition={fadeDuration}>
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <div className={styles.errorState}>
                <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
                <p className="errorHint">
                  Try reloading the page or come back later.
                </p>
              </div>
            )}
          >
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>{t("inventory.unlocked")}</h2>
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
                  useBadgesQuery={useMyBadgesInfiniteQuery({
                    ...badgesSearch,
                    Status: "unlocked",
                  })}
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
                        <h2>No unlocked badges yet</h2>
                        <p>Complete activities to earn your first badge</p>
                      </div>
                    ) : null
                  }
                />
              </Suspense>
            </div>

            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Locked</h2>
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
                  useBadgesQuery={useMyBadgesInfiniteQuery({
                    ...badgesSearch,
                    Status: "locked",
                  })}
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
                        classImgName={styles.interactiveBadge}
                        onClick={() => handleOpenBadge(badge.id)}
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
                  renderEmpty={(badges) => (badges.length === 0 ? null : null)}
                />
              </Suspense>
            </div>
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
            fallbackRender={({ error }) => (
              <div className={styles.errorState}>
                <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
                <p className="errorHint">
                  Try reloading the page or come back later.
                </p>
              </div>
            )}
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

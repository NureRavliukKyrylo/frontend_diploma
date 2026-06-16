import styles from "./OffersTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import {
  OfferListItem,
  OfferListItemSkeleton,
  offerQuery,
  getSortingOfferItems,
  TimeBankStatistics,
  type OfferSearchParams,
} from "@entities/offer";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Arrow } from "@shared/assets/icons/actions";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { Pagination } from "@shared/ui";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useOffersTab } from "../model/useOffersTab";
import { OffersFilter, OffersListWidget } from "@widgets/offers";
import { useSuspenseQuery } from "@tanstack/react-query";

interface OffersTabProps {
  search: OfferSearchParams;
}

export const OffersTab = ({ search }: OffersTabProps) => {
  const { t } = useTranslation(["timeBank", "common"]);
  const {
    handleSearch,
    handleSort,
    handlePageChange,
    offers,
    profile,
    router,
  } = useOffersTab(search);

  return (
    <div className={styles.offersTabWrapper}>
      <aside className={styles.sidebar}>
        {profile && (
          <TimeBankStatistics statistics={profile.profile?.timeBank} />
        )}
        <OffersFilter search={search} />
      </aside>

      <div className={styles.mainContent}>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">{t("errors.hint")}</p>
            </div>
          )}
        >
          <div className={styles.searchRow}>
            <SearchBar value={search.Search} onChange={handleSearch} />
            <SortDropDown
              options={getSortingOfferItems(t)}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
            />
          </div>

          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={styles.offersList}
          >
            {offers?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>{t("offers.emptyState.title")}</h2>
                <p>{t("offers.emptyState.description")}</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    items={12}
                    renderSkeleton={() => <OfferListItemSkeleton />}
                    className={styles.offersGrid}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(search)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <OffersListWidget
                      className={styles.offersGrid}
                      renderCard={(offer, index) => (
                        <motion.div
                          key={offer.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          className={styles.offerCardMotion}
                        >
                          <OfferListItem
                            offer={offer}
                            bottomContent={
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 18,
                                }}
                                style={{ display: "inline-flex" }}
                              >
                                <BaseButtonWrapper
                                  className={styles.takeButton}
                                  onClick={() =>
                                    router.navigate({
                                      to: "/offers/$id",
                                      params: { id: offer.id },
                                    })
                                  }
                                >
                                  <motion.div
                                    className={styles.buttonContent}
                                    whileHover={{ gap: "10px" }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                      damping: 20,
                                    }}
                                  >
                                    {t("offers.actions.take")} <Arrow />
                                  </motion.div>
                                </BaseButtonWrapper>
                              </motion.div>
                            }
                          />
                        </motion.div>
                      )}
                      useOffersQuery={() => {
                        const { data } = useSuspenseQuery(
                          offerQuery.list(search),
                        );
                        return { data: data.data };
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>

          {offers && offers.pagination.totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={offers.pagination.totalPages}
                page={search.Page}
                onChange={handlePageChange}
              />
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};

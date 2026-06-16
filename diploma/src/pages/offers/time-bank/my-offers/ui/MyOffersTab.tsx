import styles from "./MyOffersTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import {
  MyOfferControlCardSkeleton,
  offerQuery,
  getSortingOfferItems,
  type OfferMySearchParams,
} from "@entities/offer";
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
import { useMyOffersTab } from "../model/useMyOffersTab";
import { MyOffersFilter, OffersListWidget } from "@widgets/offers";
import { MyOfferControlCard } from "@entities/offer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DeactivateOfferButton, OfferFormButton } from "@features/time-bank";

interface MyOffersTabProps {
  search: OfferMySearchParams;
}

export const MyOffersTab = ({ search }: MyOffersTabProps) => {
  const { t } = useTranslation(["timeBank", "common"]);
  const { handleSearch, handleSort, handlePageChange, myOffers, router } =
    useMyOffersTab(search);

  return (
    <div className={styles.myOffersTabWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <h1>{t("myOffers.title")}</h1>
            <h2>{myOffers?.stats.totalOffers}</h2>
            <div className={styles.lineDivider} />
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.activeBlock}>
              <h1>{t("myOffers.status.active")}</h1>
              <h2>{myOffers?.stats.activeOffers}</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.inActiveBlock}>
              <h1>{t("myOffers.status.inactive")}</h1>
              <h2>{myOffers?.stats.inActiveOffers}</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.totalBookingsBlock}>
              <h1>{t("myOffers.status.totalBookings")}</h1>
              <h2>{myOffers?.stats.totalBookings}</h2>
            </div>
            <div className={styles.lineDivider} />
          </div>
        </div>
        <OfferFormButton />
        <MyOffersFilter search={search} />
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
            {myOffers?.items?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>{t("myOffers.emptyState.title")}</h2>
                <p>{t("myOffers.emptyState.description")}</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    items={12}
                    renderSkeleton={() => (
                      <div className={styles.offerCardMotion}>
                        <MyOfferControlCardSkeleton />
                      </div>
                    )}
                    className={styles.myOffersGrid}
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
                      className={styles.myOffersGrid}
                      renderCard={(offer, index) => (
                        <motion.div
                          key={offer.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          className={styles.offerCardMotion}
                          onClick={() =>
                            router.navigate({
                              to: "/offers/my/$id",
                              params: { id: offer.id },
                            })
                          }
                        >
                          <MyOfferControlCard
                            key={offer.id}
                            offer={offer}
                            className={styles.myOfferWrapper}
                            bottomContent={
                              <div
                                className={styles.offerActions}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <p className={styles.offerActionsText}>
                                  {t("myOffers.manageText")}
                                </p>
                                <div className={styles.offerActionsButtons}>
                                  <OfferFormButton
                                    initialValues={{
                                      id: offer.id,
                                      title: offer.title,
                                      categories: offer.categories,
                                      description: offer.description,
                                      endAt: offer.endAt
                                        ? new Date(offer.endAt).toISOString()
                                        : null,
                                      startAt: offer.startAt
                                        ? new Date(offer.startAt).toISOString()
                                        : null,
                                      isOnline: offer.isOnline,
                                      location: offer.location,
                                      priceMinutes: offer.priceMinutes,
                                      skills: offer.skills,
                                    }}
                                    isEdit={true}
                                  />
                                  {offer.isActive && (
                                    <DeactivateOfferButton offerId={offer.id} />
                                  )}
                                </div>
                              </div>
                            }
                          />
                        </motion.div>
                      )}
                      useOffersQuery={() => {
                        const { data } = useSuspenseQuery(
                          offerQuery.my(search),
                        );
                        return { data: data.items };
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
          {myOffers && myOffers.pagination.totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={myOffers.pagination.totalPages}
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

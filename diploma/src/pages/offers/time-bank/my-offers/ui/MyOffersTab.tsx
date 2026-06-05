import styles from "./MyOffersTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  MyOfferControlCardSkeleton,
  offerQuery,
  sortingOfferItems,
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
import { OfferFormButton } from "@features/time-bank";

interface MyOffersTabProps {
  search: OfferMySearchParams;
}

export const MyOffersTab = ({ search }: MyOffersTabProps) => {
  const { handleSearch, handleSort, handlePageChange, myOffers, router } =
    useMyOffersTab(search);

  return (
    <div className={styles.myOffersTabWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <h1>MY OFFERS</h1>
            <h2>4</h2>
            <div className={styles.lineDivider} />
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.activeBlock}>
              <h1>Active</h1>
              <h2>4</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.inActiveBlock}>
              <h1>Inactive</h1>
              <h2>4</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.totalBookingsBlock}>
              <h1>Total bookings</h1>
              <h2>4</h2>
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
              <p className="errorHint">
                Try reloading the page or come back later.
              </p>
            </div>
          )}
        >
          <div className={styles.searchRow}>
            <SearchBar value={search.Search} onChange={handleSearch} />
            <SortDropDown
              options={sortingOfferItems}
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
                <h2>No offers found</h2>
                <p>Try adjusting your search query</p>
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
                          whileHover="hover"
                          animate="visible"
                          className={styles.offerCardMotion}
                        >
                          <MyOfferControlCard
                            key={offer.id}
                            offer={offer}
                            bottomContent={
                              <OfferFormButton
                                initialValues={{
                                  id: offer.id,
                                  title: offer.title,
                                  categoryIds: offer.categories.map((value) =>
                                    String(value.id),
                                  ),
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
                                  skillIds: offer.skills.map((value) =>
                                    String(value.id),
                                  ),
                                }}
                                isEdit={true}
                              />
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
        </ErrorBoundary>
      </div>
    </div>
  );
};

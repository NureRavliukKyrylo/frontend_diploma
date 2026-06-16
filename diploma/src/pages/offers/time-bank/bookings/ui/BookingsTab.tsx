import styles from "./BookingsTab.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";
import {
  BookingControlCardSkeleton,
  offerQuery,
  getSortingOfferItems,
  type OfferJoined,
  type OfferJoinedSearchParams,
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
import { useBookingsTab } from "../model/useBookingsTab";
import { BookingsFilter, OffersListWidget } from "@widgets/offers";
import { BookingControlCard } from "@entities/offer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBottomContent } from "../libs/getBottomContent";

interface BookingsTabProps {
  search: OfferJoinedSearchParams;
}

export const BookingsTab = ({ search }: BookingsTabProps) => {
  const { t } = useTranslation(["timeBank", "common"]);
  const { handleSearch, handleSort, handlePageChange, bookings, router } =
    useBookingsTab(search);

  return (
    <div className={styles.bookingsTabWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <h1>{t("bookings.title")}</h1>
            <h2>
              {(bookings?.stats.inProgressBookings ?? 0) +
                (bookings?.stats.completedBookings ?? 0) +
                (bookings?.stats.pendingBookings ?? 0)}
            </h2>
            <div className={styles.lineDivider} />
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.inProgressBlock}>
              <h1>{t("bookings.status.inProgress")}</h1>
              <h2>{bookings?.stats.inProgressBookings ?? 0}</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.pendingBlock}>
              <h1>{t("bookings.status.pending")}</h1>
              <h2>{bookings?.stats.pendingBookings ?? 0}</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.completedBlock}>
              <h1>{t("bookings.status.completed")}</h1>
              <h2>{bookings?.stats.completedBookings ?? 0}</h2>
            </div>
            <div className={styles.lineDivider} />
          </div>
        </div>

        <BookingsFilter search={search} />
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
            {bookings?.items?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>{t("bookings.emptyState.title")}</h2>
                <p>{t("bookings.emptyState.description")}</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    items={12}
                    renderSkeleton={() => (
                      <div className={styles.bookingCardMotion}>
                        <BookingControlCardSkeleton />
                      </div>
                    )}
                    className={styles.bookingsGrid}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(search)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <OffersListWidget<OfferJoined>
                      className={styles.bookingsGrid}
                      renderCard={(offer, index) => (
                        <motion.div
                          key={offer.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          className={styles.bookingCardMotion}
                          onClick={() =>
                            router.navigate({
                              to: "/offers/$id",
                              params: { id: offer.id },
                            })
                          }
                        >
                          <BookingControlCard
                            offer={offer}
                            bottomContent={
                              <div onClick={(e) => e.stopPropagation()}>
                                {getBottomContent(offer, t)}
                              </div>
                            }
                            className={styles.bookingWrapper}
                          />
                        </motion.div>
                      )}
                      useOffersQuery={() => {
                        const { data } = useSuspenseQuery(
                          offerQuery.joined(search),
                        );
                        return { data: data.items };
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
          {bookings && bookings.pagination.totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={bookings.pagination.totalPages}
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

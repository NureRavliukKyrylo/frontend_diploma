import {
  BookingListItem,
  BookingListItemSkeleton,
  offerQuery,
} from "@entities/offer";
import styles from "./BookingsTab.module.scss";
import { LoadMoreButton } from "@shared/ui/buttons";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { BookingsListWidget } from "@widgets/offers";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { getBookingBottomContent } from "../libs/getBookingBottomContent";

interface BookingsTabProps {
  offerId: string;
  PageSize: number;
}

export const BookingsTab = ({ offerId, PageSize }: BookingsTabProps) => {
  return (
    <div className={styles.bookingsTabWrapper}>
      <div className={styles.mainContent}>
        <h1 className={styles.bookingsTitle}>Bookings</h1>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className={styles.errorHttpMessage}>
                {getHttpErrorInfo(error)}
              </p>
              <p className={styles.errorHint}>
                Try reloading the page or come back later.
              </p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <ListWidgetSkeleton
                className={styles.bookingsList}
                renderSkeleton={() => <BookingListItemSkeleton />}
                items={8}
              />
            }
          >
            <BookingsListWidget
              useBookingsQuery={() => {
                const { data } = useSuspenseInfiniteQuery(
                  offerQuery.listBookings(offerId, { PageSize }),
                );
                return { data: data };
              }}
              className={styles.bookingsList}
              renderCard={(booking) => (
                <BookingListItem
                  key={booking.id}
                  booking={booking}
                  actions={getBookingBottomContent(booking)}
                />
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
              renderEmpty={(bookings) =>
                bookings && bookings.length === 0 ? (
                  <div className={styles.emptyState}>
                    <h2>No bookings yet</h2>
                    <p>Wait for the first booking to your offer</p>
                  </div>
                ) : null
              }
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

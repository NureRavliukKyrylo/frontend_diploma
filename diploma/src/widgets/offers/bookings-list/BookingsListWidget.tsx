import styles from "./BookingsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { PaginationRender, QueryResult } from "@shared/config/types";
import type { OfferBooking } from "@entities/offer";

interface BookingsListWidgetProps {
  useBookingsQuery?: () => QueryResult<OfferBooking>;
  bookings?: OfferBooking[];
  renderCard: (booking: OfferBooking, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  renderPagination?: (props: PaginationRender) => React.ReactNode;
  renderEmpty?: (bookings: OfferBooking[]) => React.ReactNode;
  startSlot?: React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const BookingsListWidget = ({
  useBookingsQuery,
  renderCard,
  bookings: readyBookings,
  renderPagination,
  renderEmpty,
  className,
  renderSkeleton,
  skeletonItems,
  startSlot,
}: BookingsListWidgetProps) => {
  const queryResult = useBookingsQuery?.();

  const bookings = readyBookings ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;

  const hasNextPage = queryResult?.hasNextPage ?? false;
  const isFetchingNextPage = queryResult?.isFetchingNextPage ?? false;
  const fetchNextPage = queryResult?.fetchNextPage ?? (() => {});

  const wrapperClass =
    `${styles.bookingsListWrapper} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <>
      {renderEmpty?.(bookings) ?? (
        <>
          <div className={wrapperClass}>
            {startSlot}
            {bookings?.map((booking, index) => renderCard(booking, index))}
          </div>
          {renderPagination?.({
            fetchNextPage,
            isFetchingNextPage,
            hasNextPage,
          })}
        </>
      )}
    </>
  );
};

import styles from "./OffersListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";
import type { Offer, OfferJoined } from "@entities/offer";

interface OffersListWidgetProps<TOffer = Offer> {
  useOffersQuery?: () => QueryResult<TOffer>;
  offers?: TOffer[];
  renderCard: (offer: TOffer, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  startSlot?: React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const OffersListWidget = <TOffer extends Offer | OfferJoined>({
  useOffersQuery,
  renderCard,
  offers: readyOffers,
  className,
  renderSkeleton,
  skeletonItems,
  startSlot,
}: OffersListWidgetProps<TOffer>) => {
  const queryResult = useOffersQuery?.();

  const offers = readyOffers ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass = `${styles.offersListWrapper} ${className ?? ""}`.trim();

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
    <div className={wrapperClass}>
      {startSlot}
      {offers?.map((offer, index) => renderCard(offer, index))}
    </div>
  );
};

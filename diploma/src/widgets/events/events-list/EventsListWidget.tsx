import type { QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./EventsListWidget.module.scss";
import type { Event } from "@entities/event";

interface EventsListWidgetProps {
  query?: QueryResult<Event>;
  events?: Event[];
  renderCard: (event: Event, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const EventsListWidget = ({
  query,
  events: readyEvents,
  renderCard,
  renderSkeleton,
  skeletonItems,
  startSlot,
  className,
}: EventsListWidgetProps) => {
  const events = readyEvents ?? query?.data ?? [];
  const isLoading = query?.isLoading ?? false;

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
    <div className={`${styles.feedbackListWrapper} ${className ?? ""}`.trim()}>
      {startSlot}
      {events.map((event, index) => renderCard(event, index))}
    </div>
  );
};

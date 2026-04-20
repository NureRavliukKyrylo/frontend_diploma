import type { QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./EventsListWidget.module.scss";
import type { Event } from "@entities/event";

interface EventsListWidgetProps {
  useEventsQuery?: () => QueryResult<Event>;
  events?: Event[];
  renderCard: (event: Event, index: number) => React.ReactNode;
  renderEmpty?: (events: Event[]) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const EventsListWidget = ({
  useEventsQuery,
  events: readyEvents,
  renderCard,
  renderSkeleton,
  renderEmpty,
  skeletonItems,
  startSlot,
  className,
}: EventsListWidgetProps) => {
  const queryResult = useEventsQuery?.();
  const events = readyEvents ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;

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
      {renderEmpty?.(events) ?? (
        <div
          className={`${styles.feedbackListWrapper} ${className ?? ""}`.trim()}
        >
          {startSlot}
          {events.map((event, index) => renderCard(event, index))}
        </div>
      )}
    </>
  );
};

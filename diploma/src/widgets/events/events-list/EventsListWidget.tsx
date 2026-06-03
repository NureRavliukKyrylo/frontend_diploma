import type { QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./EventsListWidget.module.scss";
import type { Event, EventAttendance } from "@entities/event";

interface EventsListWidgetProps<TEvent = Event> {
  useEventsQuery?: () => QueryResult<TEvent>;
  events?: TEvent[];
  renderCard: (event: TEvent, index: number) => React.ReactNode;
  renderEmpty?: (events: TEvent[]) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const EventsListWidget = <TEvent extends Event | EventAttendance>({
  useEventsQuery,
  events: readyEvents,
  renderCard,
  renderSkeleton,
  renderEmpty,
  skeletonItems,
  startSlot,
  className,
}: EventsListWidgetProps<TEvent>) => {
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
        <div className={`${styles.eventsList} ${className ?? ""}`.trim()}>
          {startSlot}
          {events.map((event, index) => renderCard(event, index))}
        </div>
      )}
    </>
  );
};

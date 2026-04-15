import styles from "./EventsListFilter.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import type { QueryResult } from "@shared/config/types";
import { Tab } from "@shared/ui";
import type { Event } from "@entities/event";

interface EventsListFilterProps {
  useEventsQuery: () => QueryResult<Pick<Event, "id" | "title">>;
  selectedIds?: string[];
  onToggle: (id: string) => void;
}

export const EventsListFilter = ({
  useEventsQuery,
  selectedIds,
  onToggle,
}: EventsListFilterProps) => {
  const {
    data: events = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useEventsQuery();

  if (isError) {
    return (
      <div className={styles.stateMessage}>
        <p className={styles.errorMessage}>Failed to load organizations</p>
      </div>
    );
  }

  if (events.length === 0) {
    return <p className={styles.emptyText}>No events found</p>;
  }

  return (
    <div className={styles.eventsInfinite}>
      <div className={styles.eventsListFilter}>
        <AnimatePresence>
          {events?.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={styles.eventTabWrapper}
            >
              <Tab
                name={event.title}
                isSelected={selectedIds?.includes(event.id) ?? false}
                onClick={() => onToggle(event.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage?.()}
          disabled={isFetchingNextPage}
          className={styles.showMoreEventsButton}
        >
          {isFetchingNextPage ? "Loading..." : "show more"}
        </BaseButtonWrapper>
      )}
    </div>
  );
};

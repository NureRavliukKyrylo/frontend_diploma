import {
  EventCard,
  EventCardSkeleton,
  sortingEventItems,
  useEventsListQuery,
  type EventSearchParams,
} from "@entities/event";
import { useEventsTab } from "../model/useEventsTab";
import styles from "./EventsTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { EventFiltersWidget, EventsListWidget } from "@widgets/events";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface EventsTabProps {
  search: EventSearchParams;
}

export const EventsTab = ({ search }: EventsTabProps) => {
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events,
    router,
  } = useEventsTab(search);

  return (
    <div className={styles.mainEventsSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">
                Try reloading the page or come back later.
              </p>
            </div>
          );
        }}
      >
        <div className={styles.filterEventsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <EventFiltersWidget search={search} />
            </ToggleDropdownButton>
            <SearchBar
              value={search.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={sortingEventItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Default"}
            />
          </div>
          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.eventsList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {events?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No events found</h2>
                <p>Try adjusting your filters or search query</p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={EventCardSkeleton}
                    className={styles.eventsListWrapper}
                  />
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={JSON.stringify(search)}
                    {...fadeVariants}
                    transition={fadeDuration}
                  >
                    <EventsListWidget
                      className={styles.eventsListWrapper}
                      renderCard={(event, index) => (
                        <motion.div
                          key={event.id}
                          custom={index + 1}
                          variants={staggeredCardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={styles.eventCardMotion}
                          onClick={() =>
                            router.navigate({
                              to: "/events/$id",
                              params: { id: event.id },
                            })
                          }
                        >
                          <EventCard event={event} />
                        </motion.div>
                      )}
                      useEventsQuery={useEventsListQuery(search)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </div>

        {events && events.pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              total={events.pagination.totalPages}
              page={search.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

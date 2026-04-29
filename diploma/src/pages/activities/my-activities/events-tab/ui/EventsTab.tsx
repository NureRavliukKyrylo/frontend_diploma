import styles from "./EventsTab.module.scss";
import { ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useEventsTab } from "../model/useEventsTab";
import {
  EventControlCard,
  sortingEventItems,
  useMyEventsListQuery,
  type MyEventsSearchParams,
} from "@entities/event";
import { EventsListWidget, MyEventsFilterWidget } from "@widgets/events";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariantsNoHover,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { LeaveConfirmationModal } from "@features/participation";

export const EventsTab = ({ search }: { search: MyEventsSearchParams }) => {
  const {
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    isFilterOpen,
    events,
    isEmpty,
    hasActiveFilters,
    handleLeaveEvent,
    selectedEvent,
    handleCloseModal,
    isModalOpen,
  } = useEventsTab(search);

  return (
    <>
      <div className={styles.mainMyEventsSection}>
        <div className={styles.filtersBlock}>
          <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
            <MyEventsFilterWidget search={search} />
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
          className={`${styles.myEventsList} ${isFilterOpen ? styles.filterOpen : ""}`}
        >
          {isEmpty ? (
            <div className={styles.emptyState}>
              {hasActiveFilters ? (
                <>
                  <h2>No events found</h2>
                  <p>Try adjusting your filters or search query</p>
                </>
              ) : (
                <>
                  <h2>No Events yet</h2>
                  <p>Join your first project to get started</p>
                </>
              )}
            </div>
          ) : (
            <Suspense
              fallback={
                <ListWidgetSkeleton
                  renderSkeleton={() => "LOADING"}
                  className={styles.myEventsListWrapper}
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
                    className={styles.myEventsListWrapper}
                    renderCard={(event, index) => (
                      <motion.div
                        key={event.id}
                        custom={index + 1}
                        variants={staggeredCardVariantsNoHover}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={styles.motionCard}
                      >
                        <EventControlCard
                          event={event}
                          menuItems={[
                            {
                              key: "leave",
                              label: "Leave Event",
                              onClick: () => handleLeaveEvent(event),
                              variant: "leave",
                            },
                          ]}
                        />
                      </motion.div>
                    )}
                    useEventsQuery={useMyEventsListQuery(search)}
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
      {selectedEvent && (
        <LeaveConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          entityId={selectedEvent.id}
          entityType="event"
          entityName={selectedEvent.title}
        />
      )}
    </>
  );
};

import styles from "./EventsTab.module.scss";
import { LinkButtonWrapper, ToggleDropdownButton } from "@shared/ui/buttons";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { useEventsTab } from "../model/useEventsTab";
import {
  EventControlCard,
  EventControlCardSkeleton,
  getSortingEventItems,
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
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface EventsTabProps {
  search: MyEventsSearchParams;
}

export const EventsTab = ({ search }: EventsTabProps) => {
  const { t } = useTranslation(["activities", "common"]);
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
    <div className={styles.mainMyEventsSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
            <p className="errorHint">{t("common:errors.errorHint")}</p>
          </div>
        )}
      >
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
            options={getSortingEventItems(t)}
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
                  <h2>{t("activities:my.events.notFound")}</h2>
                  <p>{t("activities:my.events.notFoundHint")}</p>
                </>
              ) : (
                <>
                  <h2>{t("activities:my.events.empty")}</h2>
                  <p>{t("activities:my.events.emptyHint")}</p>
                </>
              )}
            </div>
          ) : (
            <Suspense
              fallback={
                <ListWidgetSkeleton
                  renderSkeleton={EventControlCardSkeleton}
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
                              label: t("common:participation.leave", {
                                entity: t(
                                  `common:participation.entities.event`,
                                ),
                              }),
                              onClick: () => handleLeaveEvent(event),
                              variant: "leave",
                            },
                          ]}
                          actionButton={
                            <motion.div
                              whileHover={{
                                scale: 1.03,
                                backgroundColor: "#000000",
                                color: "#ffffff",
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className={styles.learnMoreMyProject}
                            >
                              <LinkButtonWrapper
                                to="/events/my/$id"
                                params={{ id: event.id }}
                                className={styles.btnLink}
                              >
                                {t("common:actions.getStarted")}
                              </LinkButtonWrapper>
                            </motion.div>
                          }
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
      </ErrorBoundary>
    </div>
  );
};

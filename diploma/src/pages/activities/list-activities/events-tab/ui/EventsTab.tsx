import {
  EventCard,
  EventCardSkeleton,
  getSortingEventItems,
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
import { useTranslation } from "react-i18next";
import type { BaseFiltersRoute } from "@shared/config/types";

interface EventsTabProps {
  search: EventSearchParams;
  from?: BaseFiltersRoute;
  joinedOnly?: boolean;
  hideOrganizationFilter?: boolean;
}

export const EventsTab = ({
  search,
  from = "/activities/",
  joinedOnly = false,
  hideOrganizationFilter = false,
}: EventsTabProps) => {
  const { t } = useTranslation(["activities", "common"]);
  const effectiveSearch = joinedOnly
    ? { ...search, ShowJoined: true }
    : search;
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events,
    router,
  } = useEventsTab(effectiveSearch, from, joinedOnly);

  return (
    <div className={styles.mainEventsSection}>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          );
        }}
      >
        <div className={styles.filterEventsWrapper}>
          <div className={styles.filtersInteractions}>
            <ToggleDropdownButton onOpenChange={setIsFilterOpen}>
              <EventFiltersWidget
                search={effectiveSearch}
                from={from}
                hideOrganizationFilter={hideOrganizationFilter}
              />
            </ToggleDropdownButton>
            <SearchBar
              value={effectiveSearch.Search}
              onChange={handleSearch}
              variant="projects"
            />
            <SortDropDown
              options={getSortingEventItems(t)}
              onSelect={handleSort}
              value={effectiveSearch.OrderBy ?? "Default"}
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
                <h2>{t("activities:states.emptyEvents.title")}</h2>
                <p>{t("activities:states.emptyEvents.subtitle")}</p>
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
                    key={JSON.stringify(effectiveSearch)}
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
                    useEventsQuery={useEventsListQuery(effectiveSearch)}
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
              page={effectiveSearch.Page}
              onChange={handlePageChange}
            />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

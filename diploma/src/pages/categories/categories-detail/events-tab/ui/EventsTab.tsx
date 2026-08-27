import {
  EventCard,
  getSortingEventItems,
  useEventsListQuery,
  type EventSearchParamsNoCategories,
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
import { ProjectCardSkeleton } from "@entities/project";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { useTranslation } from "react-i18next";

interface EventsTabProps {
  search: EventSearchParamsNoCategories;
  categoryId: string;
}

export const EventsTab = ({ search, categoryId }: EventsTabProps) => {
  const { t } = useTranslation(["activities", "common"]);
  const {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events,
    router,
  } = useEventsTab(search, categoryId);

  return (
    <div className={styles.categoryEventsSection}>
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
                search={search}
                includeCategories={false}
                from="/categories/$id/"
              />
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
            className={`${styles.eventsList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {events?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>
                  {t("activities:categories.detail.emptyStates.events.title")}
                </h2>
                <p>
                  {t(
                    "activities:categories.detail.emptyStates.events.subtitle",
                  )}
                </p>
              </div>
            ) : (
              <Suspense
                fallback={
                  <ListWidgetSkeleton
                    renderSkeleton={ProjectCardSkeleton}
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
                      useEventsQuery={useEventsListQuery({
                        CategoryIds: [categoryId],
                        ...search,
                      })}
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

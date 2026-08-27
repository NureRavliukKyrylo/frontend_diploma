import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AnimatePresence, motion } from "framer-motion";
import {
  EventCard,
  EventCardSkeleton,
  eventQuery,
  eventSearchDefaults,
  getSortingEventItems,
  useEventsListQuery,
  type EventSearchParams,
} from "@entities/event";
import type { Organization } from "@entities/organization";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { EventsListWidget } from "@widgets/events/events-list/EventsListWidget";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { EventsPanelControls } from "./ui/EventsPanelControls";
import { EventsPanelPagination } from "./ui/EventsPanelPagination";
import styles from "./Panel.module.scss";

interface OrganizationDetailsEventsPanelProps {
  organization: Organization;
}

export const OrganizationDetailsEventsPanel = ({
  organization,
}: OrganizationDetailsEventsPanelProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation(["common", "organizations"]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sortingEventItems = useMemo(() => getSortingEventItems(t), [t]);
  const [search, setSearch] = useState<EventSearchParams>({
    ...eventSearchDefaults,
    OrganizationIds: [organization.id],
    Page: 1,
    PageSize: 9,
  });
  const requestSearch = useMemo(() => {
    const { tab: _tab, ...searchWithoutTab } = search;

    return {
      ...searchWithoutTab,
      OrganizationIds: [organization.id],
    };
  }, [organization.id, search]);
  const { data: eventsResponse } = useQuery(eventQuery.list(requestSearch));
  const updateSearch = (patch: Partial<EventSearchParams>) =>
    setSearch((prev) => ({ ...prev, ...patch }));

  return (
    <div className={styles.eventsPanel}>
      <div className={styles.filterEventsWrapper}>
        <EventsPanelControls
          organizationId={organization.id}
          search={search}
          sortingEventItems={sortingEventItems}
          onFilterOpenChange={setIsFilterOpen}
          onSearchChange={updateSearch}
          onClearFilters={() =>
            setSearch({
              ...eventSearchDefaults,
              OrganizationIds: [organization.id],
              Page: 1,
              PageSize: 9,
            })
          }
        />

        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          )}
        >
          <motion.div
            layout
            initial={false}
            transition={{ layout: layoutTransition }}
            className={`${styles.eventsList} ${isFilterOpen ? styles.filterOpen : ""}`}
          >
            {eventsResponse?.data?.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>{t("organizations:details.panels.noEvents")}</h2>
                <p>{t("organizations:details.panels.adjustFilters")}</p>
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
                    key={JSON.stringify(requestSearch)}
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
                            navigate({
                              to: "/events/$id",
                              params: { id: event.id },
                            })
                          }
                        >
                          <EventCard event={event} />
                        </motion.div>
                      )}
                      useEventsQuery={useEventsListQuery(requestSearch)}
                    />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            )}
          </motion.div>
        </ErrorBoundary>
      </div>

      {eventsResponse ? (
        <EventsPanelPagination
          totalPages={eventsResponse.pagination.totalPages}
          page={search.Page ?? 1}
          organizationId={organization.id}
          onChange={updateSearch}
        />
      ) : null}
    </div>
  );
};

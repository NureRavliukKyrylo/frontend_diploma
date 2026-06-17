import styles from "./ProjectEventsTab.module.scss";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";
import { EventsListWidget } from "@widgets/events";
import {
  EventCard,
  EventCardSkeleton,
  eventQuery,
  useEventsListQuery,
} from "@entities/event";
import type { EventsSearch } from "@entities/project";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeDuration,
  fadeVariants,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "@shared/ui";
import { useTranslation } from "react-i18next";

interface ProjectEventsTabProps {
  projectId: string;
  search: EventsSearch;
}

export const ProjectEventsTab = ({
  search,
  projectId,
}: ProjectEventsTabProps) => {
  const { t } = useTranslation(["project", "common"]);
  const router = useRouter();
  const { data: events } = useQuery(
    eventQuery.list({ ProjectIds: [projectId], ...search }),
  );
  const navigate = useNavigate({ from: "/projects/$id/" });

  const handlePageChange = (page: number) => {
    navigate({ search: (prev) => ({ ...prev, Page: page }) });
  };

  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          );
        }}
      >
        <div className={styles.eventsPaginationWrapper}>
          <Suspense
            fallback={
              <ListWidgetSkeleton
                className={styles.eventsProjectList}
                renderSkeleton={() => <EventCardSkeleton />}
              />
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                {...fadeVariants}
                transition={fadeDuration}
                style={{ width: "100%" }}
              >
                <EventsListWidget
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
                  className={styles.eventsProjectList}
                  useEventsQuery={useEventsListQuery({
                    ProjectIds: [projectId],
                    ...search,
                  })}
                  renderEmpty={(eventsData) =>
                    eventsData && eventsData.length === 0 ? (
                      <div className={styles.emptyState}>
                        <h2>{t("project:states.noEvents")}</h2>
                      </div>
                    ) : null
                  }
                />
              </motion.div>
            </AnimatePresence>
          </Suspense>
          {events && events.pagination.totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={events.pagination.totalPages}
                page={search.Page}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  );
};

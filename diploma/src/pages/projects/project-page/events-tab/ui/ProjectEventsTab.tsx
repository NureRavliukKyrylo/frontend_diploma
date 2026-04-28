import { MemberCardSkeleton } from "@entities/user/profile";
import styles from "./ProjectEventsTab.module.scss";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";
import { EventsListWidget } from "@widgets/events";
import { EventCard, useEventsListQuery } from "@entities/event";
import type { EventsSearch } from "@entities/project";

interface ProjectEventsTab {
  projectId: string;
  search: EventsSearch;
}

export const ProjectEventsTab = ({ search, projectId }: ProjectEventsTab) => {
  return (
    <>
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
        <Suspense
          fallback={
            <ListWidgetSkeleton
              className={styles.eventsProjectList}
              renderSkeleton={() => <MemberCardSkeleton />}
            />
          }
        >
          <EventsListWidget
            renderCard={(event) => <EventCard event={event} />}
            className={styles.eventsProjectList}
            useEventsQuery={useEventsListQuery({
              ProjectIds: [projectId],
              ...search,
            })}
            renderEmpty={(events) =>
              events && events.length === 0 ? (
                <div className={styles.emptyState}>
                  <h2>No Events yet</h2>
                </div>
              ) : null
            }
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

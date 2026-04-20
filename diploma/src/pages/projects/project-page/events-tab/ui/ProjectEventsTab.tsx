import { MemberCardSkeleton } from "@entities/user/profile";
import styles from "./ProjectEventsTab.module.scss";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";
import { EventsListWidget } from "@widgets/events";
import { EventCard, useEventsListQuery } from "@entities/event";

interface ProjectEventsTab {
  projectId: string;
}

import type { Event } from "@entities/event";

export const mockEvent: Event = {
  id: "evt-001",
  title: "City Park Cleanup",
  description: "Join us for a community cleanup of the central city park.",
  endAt: "2025-06-15T18:00:00.000Z",
  progressPercent: 65,
  tasksTotal: 12,
  organization: {
    id: "org-001",
    name: "Green City Initiative",
    logoUrl: "https://placehold.co/40x40",
  },
  project: {
    id: "proj-001",
    title: "Eco Awareness Workshops",
  },
  location: {
    latitude: 52.2297,
    longitude: 21.0122,
  },
  memberCount: 34,
  type: "cleanup",
  rating: {
    value: 4.3,
    totalVotes: 58,
    detailInfo: [
      { value: 5, totalVotes: 30, percentOfAll: 51.7 },
      { value: 4, totalVotes: 15, percentOfAll: 25.9 },
      { value: 3, totalVotes: 8, percentOfAll: 13.8 },
      { value: 2, totalVotes: 3, percentOfAll: 5.2 },
      { value: 1, totalVotes: 2, percentOfAll: 3.4 },
    ],
  },
  memberPreviews: [
    {
      userId: "usr-001",
      firstName: "Anna",
      lastName: "Kowalski",
      avatarUrl: "https://placehold.co/32x32",
      role: { roleId: "role-001", name: "Organizer" },
    },
    {
      userId: "usr-002",
      firstName: "Marek",
      lastName: "Nowak",
      avatarUrl: "https://placehold.co/32x32",
      role: { roleId: "role-002", name: "Volunteer" },
    },
    {
      userId: "usr-003",
      firstName: "Zofia",
      lastName: "Wiśniewska",
      avatarUrl: "https://placehold.co/32x32",
      role: { roleId: "role-002", name: "Volunteer" },
    },
  ],
  recurrence: "weekly",
  status: "active",
};

export const ProjectEventsTab = ({ projectId }: ProjectEventsTab) => {
  return (
    <>
      <EventCard event={mockEvent} />
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
            renderCard={() => <EventCard event={mockEvent} />}
            className={styles.eventsProjectList}
            useEventsQuery={useEventsListQuery({
              ProjectIds: [projectId],
              PageSize: 9,
            })}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

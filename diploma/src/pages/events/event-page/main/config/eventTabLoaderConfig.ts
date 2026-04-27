import {
  feedbackSchema,
  membersSchema,
  overviewSchema,
  tasksSchema,
  type EventDetailSearch,
  type FeedbackEventSearch,
  type MembersEventSearch,
  type OverviewEventSearch,
  type TasksEventSearch,
} from "@entities/event";
import { feedbackQuery } from "@entities/feedback";
import { taskQuery, type TaskStatus } from "@entities/task";
import { participationQuery } from "@shared/api/participation";
import type { QueryClient } from "@tanstack/react-query";
import type { ZodType } from "zod";

type TabConfig<T extends EventDetailSearch> = {
  schema: ZodType<T>;
  queryType: "query" | "infinite" | "multi" | "none";
  query: (eventId: string, params: Omit<T, "tab">) => unknown;
  prefetch: (queryClient: QueryClient, eventId: string) => void;
};

const taskStatuses: TaskStatus[] = ["done", "planned", "inProgress", "hold"];

export const eventDetailTabLoaderConfig: {
  overview: TabConfig<OverviewEventSearch>;
  members: TabConfig<MembersEventSearch>;
  feedback: TabConfig<FeedbackEventSearch>;
  tasks: TabConfig<TasksEventSearch>;
} = {
  overview: {
    queryType: "none",
    schema: overviewSchema,
    query: () => null,
    prefetch: (queryClient, eventId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: eventId,
          entityType: "event",
          pageSize: 8,
        }),
      );
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("event", eventId, {
          PageSize: 3,
          OrderBy: "default",
        }),
      );
      taskStatuses.forEach((status) =>
        queryClient.prefetchQuery(
          taskQuery.list({
            EventIds: [eventId],
            PageSize: 4,
            Status: status,
          }),
        ),
      );
    },
  },

  members: {
    queryType: "infinite",
    schema: membersSchema,
    query: (eventId, { PageSize }) =>
      participationQuery.membersInfinite({
        entityId: eventId,
        entityType: "event",
        pageSize: PageSize,
      }),
    prefetch: (queryClient, eventId) => {
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("event", eventId, {
          PageSize: 3,
          OrderBy: "default",
        }),
      );
    },
  },

  feedback: {
    queryType: "infinite",
    schema: feedbackSchema,
    query: (eventId, { PageSize, OrderBy }) =>
      feedbackQuery.infinite("event", eventId, {
        PageSize,
        OrderBy,
      }),
    prefetch: (queryClient, eventId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: eventId,
          entityType: "event",
          pageSize: 8,
        }),
      );
    },
  },

  tasks: {
    queryType: "multi",
    schema: tasksSchema,
    query: (eventId, { PageSize }) =>
      taskStatuses.map((status) =>
        taskQuery.list({
          EventIds: [eventId],
          PageSize,
          Status: status,
        }),
      ),
    prefetch: (queryClient, eventId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: eventId,
          entityType: "event",
          pageSize: 8,
        }),
      );
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("event", eventId, {
          PageSize: 3,
          OrderBy: "default",
        }),
      );
    },
  },
};

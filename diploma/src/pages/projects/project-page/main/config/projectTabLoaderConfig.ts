import { eventQuery } from "@entities/event";
import { feedbackQuery } from "@entities/feedback";
import {
  eventsSchema,
  feedbackSchema,
  membersSchema,
  overviewSchema,
  tasksSchema,
  type EventsSearch,
  type FeedbackSearch,
  type MembersSearch,
  type OverviewSearch,
  type ProjectDetailSearch,
  type TasksSearch,
} from "@entities/project";
import { taskQuery, taskStatuses } from "@entities/task";
import { participationQuery } from "@shared/api/participation";
import type { QueryClient } from "@tanstack/react-query";
import type { ZodType } from "zod";

type TabConfig<T extends ProjectDetailSearch> = {
  schema: ZodType<T>;
  queryType: "query" | "infinite" | "multi" | "none";
  query: (projectId: string, params: Omit<T, "tab">) => unknown;
  prefetch: (queryClient: QueryClient, projectId: string) => void;
};

export const projectDetailTabLoaderConfig: {
  overview: TabConfig<OverviewSearch>;
  members: TabConfig<MembersSearch>;
  feedback: TabConfig<FeedbackSearch>;
  events: TabConfig<EventsSearch>;
  tasks: TabConfig<TasksSearch>;
} = {
  overview: {
    queryType: "none",
    schema: overviewSchema,
    query: () => null,
    prefetch: (queryClient, projectId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: projectId,
          entityType: "project",
          pageSize: 8,
        }),
      );
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("project", projectId, {
          PageSize: 3,
          OrderBy: "Default",
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 6 }),
      );
      taskStatuses.forEach((status) =>
        queryClient.prefetchInfiniteQuery(
          taskQuery.listInfinite({
            ProjectIds: [projectId],
            PageSize: 2,
            Status: status,
          }),
        ),
      );
    },
  },

  members: {
    queryType: "infinite",
    schema: membersSchema,
    query: (projectId, { PageSize }) =>
      participationQuery.membersInfinite({
        entityId: projectId,
        entityType: "project",
        pageSize: PageSize,
      }),
    prefetch: (queryClient, projectId) => {
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("project", projectId, {
          PageSize: 3,
          OrderBy: "Default",
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 6 }),
      );
    },
  },

  feedback: {
    queryType: "infinite",
    schema: feedbackSchema,
    query: (projectId, { PageSize, OrderBy }) =>
      feedbackQuery.infinite("project", projectId, {
        PageSize,
        OrderBy,
      }),
    prefetch: (queryClient, projectId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: projectId,
          entityType: "project",
          pageSize: 8,
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 6 }),
      );
    },
  },

  events: {
    queryType: "query",
    schema: eventsSchema,
    query: (projectId, { PageSize, Page }) =>
      eventQuery.list({
        ProjectIds: [projectId],
        PageSize,
        Page,
      }),
    prefetch: (queryClient, projectId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: projectId,
          entityType: "project",
          pageSize: 8,
        }),
      );
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("project", projectId, {
          PageSize: 3,
          OrderBy: "Default",
        }),
      );
    },
  },

  tasks: {
    queryType: "multi",
    schema: tasksSchema,
    query: (projectId, { PageSize }) =>
      taskStatuses.map((status) =>
        taskQuery.listInfinite({
          ProjectIds: [projectId],
          PageSize,
          Status: status,
        }),
      ),
    prefetch: (queryClient, projectId) => {
      queryClient.prefetchInfiniteQuery(
        participationQuery.membersInfinite({
          entityId: projectId,
          entityType: "project",
          pageSize: 8,
        }),
      );
      queryClient.prefetchInfiniteQuery(
        feedbackQuery.infinite("project", projectId, {
          PageSize: 3,
          OrderBy: "Default",
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 6 }),
      );
    },
  },
};

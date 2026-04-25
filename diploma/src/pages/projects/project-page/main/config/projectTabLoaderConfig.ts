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
import { taskQuery, type TaskStatus } from "@entities/task";
import { participationQuery } from "@shared/api/participation";
import type { QueryClient } from "@tanstack/react-query";
import type { ZodType } from "zod";

type TabConfig<T extends ProjectDetailSearch> = {
  schema: ZodType<T>;
  queryType: "query" | "infinite" | "multi" | "none";
  query: (projectId: string, params: Omit<T, "tab">) => unknown;
  prefetch: (queryClient: QueryClient, projectId: string) => void;
};

const taskStatuses: TaskStatus[] = ["done", "planned", "inProgress", "hold"];

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
          OrderBy: "default",
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 9 }),
      );
      taskStatuses.forEach((status) =>
        queryClient.prefetchQuery(
          taskQuery.list({
            ProjectIds: [projectId],
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
          OrderBy: "default",
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 9 }),
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
        eventQuery.list({ ProjectIds: [projectId], PageSize: 9 }),
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
          OrderBy: "default",
        }),
      );
    },
  },

  tasks: {
    queryType: "multi",
    schema: tasksSchema,
    query: (projectId, { PageSize }) =>
      taskStatuses.map((status) =>
        taskQuery.list({
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
          OrderBy: "default",
        }),
      );
      queryClient.prefetchQuery(
        eventQuery.list({ ProjectIds: [projectId], PageSize: 9 }),
      );
    },
  },
};

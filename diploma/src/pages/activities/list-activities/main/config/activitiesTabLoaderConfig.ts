import {
  eventQuery,
  type EventSearchParams,
  eventsSearchSchema,
} from "@entities/event";
import {
  taskQuery,
  type TaskSearchParams,
  tasksSearchSchema,
} from "@entities/task";
import {
  projectQuery,
  type ProjectSearchParams,
  projectBaseSchema,
} from "@entities/project";
import { categoryQuery } from "@entities/category";
import { organizationQuery } from "@entities/organization";
import type { QueryClient } from "@tanstack/react-query";
import type { ZodType } from "zod";

type TabParams = EventSearchParams | TaskSearchParams | ProjectSearchParams;

type TabConfig<T extends TabParams> = {
  schema: ZodType<T>;
  query: (params: Omit<T, "tab">) => unknown;
  prefetch: (queryClient: QueryClient) => void;
};

export const activitiesTabLoaderConfig: {
  events: TabConfig<EventSearchParams>;
  tasks: TabConfig<TaskSearchParams>;
  projects: TabConfig<ProjectSearchParams>;
} = {
  events: {
    schema: eventsSearchSchema,
    query: eventQuery.list,
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(projectQuery.infinite({ PageSize: 7 }));
      queryClient.prefetchInfiniteQuery(
        organizationQuery.infinite({ PageSize: 7 }),
      );
    },
  },
  tasks: {
    schema: tasksSearchSchema,
    query: taskQuery.list,
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(projectQuery.infinite({ PageSize: 7 }));
      queryClient.prefetchInfiniteQuery(
        organizationQuery.infinite({ PageSize: 7 }),
      );
      queryClient.prefetchInfiniteQuery(eventQuery.infinite({ PageSize: 7 }));
    },
  },
  projects: {
    schema: projectBaseSchema,
    query: projectQuery.list,
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(
        categoryQuery.infinite({ PageSize: 7 }),
      );
      queryClient.prefetchInfiniteQuery(
        organizationQuery.infinite({ PageSize: 7 }),
      );
    },
  },
};

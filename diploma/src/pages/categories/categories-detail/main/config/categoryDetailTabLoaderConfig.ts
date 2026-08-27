import {
  eventQuery,
  type EventSearchParams,
  eventsNoCategoriesSchema,
} from "@entities/event";
import {
  taskQuery,
  type TaskSearchParams,
  tasksNoCategoriesSchema,
} from "@entities/task";
import {
  projectQuery,
  type ProjectSearchParams,
  projectsNoCategoriesSchema,
} from "@entities/project";
import { organizationQuery } from "@entities/organization";
import { skillsQuery } from "@entities/skill";
import type { QueryClient } from "@tanstack/react-query";
import type { ZodType } from "zod";

type TabParams = EventSearchParams | TaskSearchParams | ProjectSearchParams;

type CategoryTabConfig<T extends TabParams> = {
  schema: ZodType<T>;
  query: (params: Omit<T, "tab" | "CategoryIds">, id: string) => unknown;
  prefetch: (queryClient: QueryClient) => void;
};

export const categoryDetailTabLoaderConfig: {
  events: CategoryTabConfig<EventSearchParams>;
  tasks: CategoryTabConfig<TaskSearchParams>;
  projects: CategoryTabConfig<ProjectSearchParams>;
} = {
  events: {
    schema: eventsNoCategoriesSchema,
    query: (params, id) => eventQuery.list({ ...params, CategoryIds: [id] }),
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(projectQuery.infinite({ PageSize: 7 }));
      queryClient.prefetchInfiniteQuery(
        organizationQuery.infinite({ PageSize: 7 }),
      );
      queryClient.prefetchInfiniteQuery(skillsQuery.infinite({ PageSize: 7 }));
    },
  },
  tasks: {
    schema: tasksNoCategoriesSchema,
    query: (params, id) => taskQuery.list({ ...params, CategoryIds: [id] }),
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(projectQuery.infinite({ PageSize: 7 }));
      queryClient.prefetchInfiniteQuery(
        organizationQuery.infinite({ PageSize: 7 }),
      );
      queryClient.prefetchInfiniteQuery(skillsQuery.infinite({ PageSize: 7 }));
      queryClient.prefetchInfiniteQuery(eventQuery.infinite({ PageSize: 7 }));
    },
  },
  projects: {
    schema: projectsNoCategoriesSchema,
    query: (params, id) => projectQuery.list({ ...params, CategoryIds: [id] }),
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(
        organizationQuery.infinite({ PageSize: 7 }),
      );
    },
  },
};

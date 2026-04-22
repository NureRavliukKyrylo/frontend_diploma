import {
  eventsTabSchema,
  eventQuery,
  type MyEventsSearchParams,
} from "@entities/event";
import {
  tasksTabSchema,
  taskQuery,
  type MyTasksSearchParams,
} from "@entities/task";
import {
  projectsTabSchema,
  projectQuery,
  type MyProjectsSearchParams,
} from "@entities/project";
import type { ZodType } from "zod";
import type { EntityType, FacetType } from "@shared/config/types";

type TabParams =
  | MyEventsSearchParams
  | MyTasksSearchParams
  | MyProjectsSearchParams;

type TabConfig<T extends TabParams> = {
  schema: ZodType<T>;
  query: (params: Omit<T, "tab">) => unknown;
  filters: { entityType: EntityType; facetType: FacetType }[];
};

export const tabLoaderConfig: {
  events: TabConfig<MyEventsSearchParams>;
  tasks: TabConfig<MyTasksSearchParams>;
  projects: TabConfig<MyProjectsSearchParams>;
} = {
  events: {
    schema: eventsTabSchema,
    query: eventQuery.my,
    filters: [
      { entityType: "event", facetType: "project" },
      { entityType: "event", facetType: "organization" },
    ],
  },
  tasks: {
    schema: tasksTabSchema,
    query: taskQuery.my,
    filters: [
      { entityType: "task", facetType: "project" },
      { entityType: "task", facetType: "organization" },
      { entityType: "task", facetType: "event" },
    ],
  },
  projects: {
    schema: projectsTabSchema,
    query: projectQuery.my,
    filters: [
      { entityType: "project", facetType: "category" },
      { entityType: "project", facetType: "organization" },
    ],
  },
};

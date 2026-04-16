import z from "zod";
import { projectOrderSchema } from "./projectsSearchSchema";
import { eventOrderSchema } from "@entities/event";
import { tasksOrderSchema } from "@entities/task";

export const myProjectsSearchDefaults = {
  projects: {
    tab: "projects" as const,
    Page: 1,
    PageSize: 9,
    OrderBy: "Default" as const,
    OnlyActive: false,
  },
  events: {
    tab: "events" as const,
    Page: 1,
    PageSize: 9,
    OrderBy: "Default" as const,
    OnlyActive: false,
  },
  tasks: {
    tab: "tasks" as const,
    Page: 1,
    PageSize: 5,
    OrderBy: "Default" as const,
    OnlyActive: false,
  },
} as const;

const baseFields = z.object({
  Search: z.string().optional(),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  OnlyActive: z.boolean().default(false),
  Page: z.number().min(1).default(1),
});

export const projectsTabSchema = baseFields.extend({
  tab: z.literal("projects").default("projects").catch("projects"),
  OrderBy: projectOrderSchema.shape.OrderBy.default(
    myProjectsSearchDefaults.projects.OrderBy,
  ),
  CategoryIds: z.array(z.string()).optional().catch([]),
  StartDate: z.string().optional(),
  EndBefore: z.string().optional(),
  PageSize: z
    .number()
    .min(1)
    .default(myProjectsSearchDefaults.projects.PageSize),
});

export const eventsTabSchema = baseFields.extend({
  tab: z.literal("events"),
  From: z.string().optional(),
  To: z.string().optional(),
  ProjectIds: z.array(z.string()).optional().catch(undefined),
  OrderBy: eventOrderSchema.shape.OrderBy.default(
    myProjectsSearchDefaults.events.OrderBy,
  ),
  PageSize: z.number().min(1).default(myProjectsSearchDefaults.events.PageSize),
});

export const tasksTabSchema = baseFields.extend({
  tab: z.literal("tasks"),
  Status: z.string().optional(),
  From: z.string().optional(),
  To: z.string().optional(),
  ProjectIds: z.array(z.string()).optional().catch(undefined),
  EventIds: z.array(z.string()).optional().catch(undefined),
  OrderBy: tasksOrderSchema.shape.OrderBy.default(
    myProjectsSearchDefaults.tasks.OrderBy,
  ),
  PageSize: z.number().min(1).default(myProjectsSearchDefaults.tasks.PageSize),
});

export const myProjectsFiltersSchema = z.preprocess(
  (input) => {
    if (typeof input === "object" && input !== null && !("tab" in input)) {
      return { ...input, tab: "projects" };
    }
    return input;
  },
  z.discriminatedUnion("tab", [
    projectsTabSchema,
    eventsTabSchema,
    tasksTabSchema,
  ]),
);

export type MyProjectsBaseSearch = z.infer<typeof myProjectsFiltersSchema>;
export type MyProjectsSearchParams = z.infer<typeof projectsTabSchema>;
export type MyEventsSearchParams = z.infer<typeof eventsTabSchema>;
export type MyTasksSearchParams = z.infer<typeof tasksTabSchema>;
export type MyProjectsTab = MyProjectsSearchParams["tab"];

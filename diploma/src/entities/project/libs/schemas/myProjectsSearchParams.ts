import z from "zod";
import { paginationSchema } from "@shared/config/schemas";
import { projectOrderSchema } from "./projectsSearchSchema";

export const myProjectSearchDefaults = {
  projects: {
    tab: "projects" as const,
    OrderBy: "Default" as const,
    Page: 1,
    PageSize: 9,
    OnlyActive: false,
  },
  events: {
    tab: "events" as const,
    OrderBy: "Default" as const,
    Page: 1,
    PageSize: 9,
    OnlyActive: false,
  },
  tasks: {
    tab: "tasks" as const,
    OrderBy: "Default" as const,
    Page: 1,
    PageSize: 5,
    OnlyActive: false,
  },
} as const;

export const myProjectsFiltersBaseSchema = z.object({
  Search: z.string().optional(),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  OnlyActive: z.boolean().optional(),
  StartDate: z.string().optional(),
  EndBefore: z.string().optional(),
  CategoryIds: z.array(z.string()).optional().catch([]),
  tab: z
    .enum(["projects", "events", "tasks"])
    .default("projects")
    .catch("projects"),
});

export const myProjectsFiltersSchema = myProjectsFiltersBaseSchema
  .extend(projectOrderSchema.shape)
  .extend(paginationSchema.shape)
  .extend({
    PageSize: z.number().min(1).optional(),
  })
  .transform((data) => ({
    ...data,
    PageSize: data.PageSize ?? myProjectSearchDefaults[data.tab].PageSize,
  }));

export type MyProjectSearchParams = z.infer<typeof myProjectsFiltersSchema>;

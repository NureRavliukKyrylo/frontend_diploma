import { paginationSchema } from "@shared/config/schemas";
import z from "zod";

export const projectsTabDefaults = {
  tab: "projects" as const,
  Page: 1,
  PageSize: 9,
  OrderBy: "Default" as const,
  OnlyActive: false,
};

export const projectOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const projectsTabBaseShape = z.object({
  tab: z.literal("projects").default("projects").catch("projects"),
  CategoryIds: z.array(z.string()).optional().catch([]),
  StartDate: z.string().optional(),
  EndBefore: z.string().optional(),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  Search: z.string().optional(),
});

export const projectsTabBaseSchema = projectsTabBaseShape
  .extend(projectOrderSchema.shape)
  .extend(paginationSchema.shape);

export const projectsTabSchema = projectsTabBaseSchema.extend({
  CategoryIds: z.array(z.string()).optional().catch([]),
  OnlyActive: z.boolean().default(false).optional(),
});

export type MyProjectsSearchParams = z.infer<typeof projectsTabSchema>;
export type MyProjectsRequestParams = Omit<
  z.infer<typeof projectsTabSchema>,
  "tab"
>;
export type ProjectPaginationParams = z.infer<typeof paginationSchema>;

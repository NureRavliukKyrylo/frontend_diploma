import z from "zod";

import { paginationSchema } from "@shared/config/schemas";
import { projectOrderSchema } from "./projectsSearchSchema";

export const myProjectSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  OnlyActive: false,
};

export const myProjectsFiltersBaseSchema = z.object({
  Search: z.string().optional(),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  OnlyActive: z.boolean().default(false).optional(),
  StartDate: z.string().optional(),
  EndBefore: z.string().optional(),
  CategoryIds: z.array(z.string()).optional().catch([]),
});

export const myProjectsFiltersSchema = myProjectsFiltersBaseSchema
  .extend(projectOrderSchema.shape)
  .extend(paginationSchema.shape);

export type MyProjectSearchParams = z.infer<typeof myProjectsFiltersSchema>;

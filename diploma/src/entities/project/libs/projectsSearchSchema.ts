import { z } from "zod";
import {
  paginationSchema,
  mapBoundsSchema,
  locationSchema,
} from "@shared/config/schemas";

export const projectSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  pageSize: 9,
  OnlyActive: false,
  ShowJoined: false,
};

export const mapProjectDefaults = {
  Page: 1,
  pageSize: 7,
  OnlyActive: false,
  ShowJoined: false,
};

export const projectOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const projectFiltersSchema = locationSchema.extend({
  EndBefore: z.string().optional(),
  StartDate: z.string().optional(),
  Search: z.string().optional(),
  Rating: z.number().min(0).max(5).optional().catch(5),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  OnlyActive: z.boolean().default(false).optional(),
  ShowJoined: z.boolean().default(false).optional(),
});

export const projectFiltersWithCategorySchema = projectFiltersSchema
  .extend({ CategoryIds: z.array(z.string()).optional().catch(undefined) })
  .extend(projectOrderSchema.shape)
  .extend(paginationSchema.shape);

export const projectSearchSchema = projectFiltersSchema
  .extend(projectOrderSchema.shape)
  .extend(paginationSchema.shape);

export const mapProjectSchema = projectFiltersSchema
  .extend(mapBoundsSchema.shape)
  .extend(paginationSchema.shape)
  .extend({
    CategoryIds: z.array(z.string()).optional().catch([]),
    pageSize: z.number().min(1).default(7).optional(),
  });

export const projectBaseSchema = projectFiltersWithCategorySchema.extend(
  mapBoundsSchema.shape,
);

export type ProjectSearchParams = z.infer<typeof projectBaseSchema>;
export type MapProjectSearchParams = z.infer<typeof mapProjectSchema>;
export type ProjectBaseParams = z.infer<typeof projectBaseSchema>;

import { z } from "zod";
import {
  paginationSchema,
  mapBoundsSchema,
  locationSchema,
} from "@shared/config/schemas";
import { projectsTabBaseSchema } from "./projectsTabSchema";

export const projectSearchDefaults = {
  tab: "projects" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  IncludeArchived: false,
  ShowJoined: false,
};

export const mapProjectDefaults = {
  Page: 1,
  PageSize: 7,
  IncludeArchived: false,
  ShowJoined: false,
};

export const projectFiltersSchema = locationSchema.extend({
  RatingFrom: z.number().min(0).max(5).optional().catch(5),
  IncludeArchived: z.boolean().default(false).optional(),
  ShowJoined: z.boolean().default(false).optional(),
});

export const projectFiltersWithCategorySchema = projectFiltersSchema
  .extend({ CategoryIds: z.array(z.string()).optional().catch(undefined) })
  .extend(projectsTabBaseSchema.shape);

export const projectSearchSchema = projectFiltersSchema
  .extend(projectsTabBaseSchema.shape)
  .omit({ tab: true });

export const mapProjectSchema = projectFiltersSchema
  .extend(mapBoundsSchema.shape)
  .extend(paginationSchema.shape)
  .extend(projectsTabBaseSchema.shape)
  .omit({ tab: true, PageSize: true, OrderBy: true })
  .extend({
    CategoryIds: z.array(z.string()).optional().catch([]),
    PageSize: z.number().min(1).default(7).optional(),
    Zoom: z.number().optional(),
  });

export const projectBaseSchema = projectFiltersWithCategorySchema
  .extend(mapBoundsSchema.shape)
  .extend(projectsTabBaseSchema.shape);

export const projectsNoCategoriesSchema = projectBaseSchema.omit({
  CategoryIds: true,
});

export type ProjectPaginationParams = z.infer<typeof paginationSchema>;
export type ProjectSearchParams = z.infer<typeof projectBaseSchema>;
export type ProjectRequestParams = Omit<
  z.infer<typeof projectBaseSchema>,
  "tab"
>;
export type MapProjectSearchParams = z.infer<typeof mapProjectSchema>;
export type MapProjectRequestParams = Omit<
  z.infer<typeof mapProjectSchema>,
  "tab"
>;
export type ProjectBaseParams = Omit<z.infer<typeof projectBaseSchema>, "tab">;
export type ProjectSearchParamsNoCategories = Omit<
  ProjectSearchParams,
  "CategoryIds"
>;

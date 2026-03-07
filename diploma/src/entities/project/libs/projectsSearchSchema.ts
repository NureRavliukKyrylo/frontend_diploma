import { z } from "zod";

export const projectSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  pageSize: 9,
  ShowCompleted: false,
  ShowJoined: false,
};

export const mapProjectDefaults = {
  ShowCompleted: false,
  ShowJoined: false,
};

export const projectPaginationSchema = z.object({
  Page: z.number().min(1).default(1).optional(),
  pageSize: z.number().min(1).default(9).optional(),
});

export const projectOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const projectMapSchema = z.object({
  MinLat: z.number().min(-90).max(90).optional(),
  MaxLat: z.number().min(-90).max(90).optional(),
  MinLng: z.number().min(-180).max(180).optional(),
  MaxLng: z.number().min(-180).max(180).optional(),
});

export const projectFiltersSchema = z.object({
  EndBefore: z.string().optional(),
  StartDate: z.string().optional(),
  Rating: z.number().min(0).max(5).optional().catch(5),
  OrganizationId: z.array(z.string()).optional().catch([]),
  RadiusKm: z.number().optional(),
  Search: z.string().optional(),
  Lat: z.number().min(-90).max(90).optional(),
  Lng: z.number().min(-180).max(180).optional(),
  Location: z.string().optional(),
  ShowCompleted: z.boolean().default(false).optional(),
  ShowJoined: z.boolean().default(false).optional(),
});

export const projectFiltersWithCategorySchema = projectFiltersSchema
  .extend({
    CategoryIds: z.array(z.string()).optional().catch([]),
  })
  .extend(projectOrderSchema.shape)
  .extend(projectPaginationSchema.shape);

export const projectSearchSchema = projectFiltersWithCategorySchema
  .extend(projectPaginationSchema.shape)
  .extend(projectOrderSchema.shape);

export const mapProjectSchema = projectFiltersSchema
  .extend(projectMapSchema.shape)
  .extend({
    CategoryIds: z.array(z.string()).optional().catch([]),
  });

export const projectBaseSchema = projectSearchSchema.extend(
  mapProjectSchema.shape,
);

export type ProjectSearchParams = z.infer<typeof projectSearchSchema>;
export type MapProjectSearchParams = z.infer<typeof mapProjectSchema>;
export type ProjectBaseParams = z.infer<typeof projectBaseSchema>;

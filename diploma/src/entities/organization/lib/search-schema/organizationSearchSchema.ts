import { z } from "zod";
import {
  paginationSchema,
  locationSchema,
  mapBoundsSchema,
} from "@shared/config/schemas";

export const organizationSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  pageSize: 12,
  IncludeArchived: false,
  ShowJoined: false,
};

export const organizationOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const organizationFiltersSchema = locationSchema.extend({
  Search: z.string().optional(),
  CategoryIds: z.array(z.string()).optional().catch([]),
  RatingFrom: z.number().min(0).max(5).optional().catch(5),
  IncludeArchived: z.boolean().optional().catch(false),
  ShowJoined: z.boolean().optional().catch(false),
  MinLat: z.number().optional(),
  MaxLat: z.number().optional(),
  MinLng: z.number().optional(),
  MaxLng: z.number().optional(),
  minLat: z.number().optional(),
  maxLat: z.number().optional(),
  minLng: z.number().optional(),
  maxLng: z.number().optional(),
});

export const organizationSearchSchema = organizationFiltersSchema
  .extend(paginationSchema.shape)
  .extend(organizationOrderSchema.shape)
  .extend({
    pageSize: z.number().min(1).default(12).catch(12).optional(),
  });

export const organizationMapSchema = organizationFiltersSchema
  .extend(mapBoundsSchema.shape)
  .extend(paginationSchema.shape)
  .extend({
    pageSize: z.number().min(1).default(12).catch(12).optional(),
  });

export type OrganizationPaginationParams = z.infer<
  typeof organizationSearchSchema
>;
export type OrganizationMapParams = z.infer<typeof organizationMapSchema>;
export type OrganizationSearchParams = z.infer<typeof organizationSearchSchema>;

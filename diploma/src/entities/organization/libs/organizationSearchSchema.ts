import { z } from "zod";
import {
  paginationSchema,
  mapBoundsSchema,
  locationSchema,
} from "@shared/config/schemas";

export const organizationFiltersSchema = locationSchema.extend({
  Search: z.string().optional(),
  CategoryIds: z.array(z.string()).optional().catch([]),
});

export const organizationSearchSchema = organizationFiltersSchema.extend(
  paginationSchema.shape,
);

export const organizationMapSchema = organizationFiltersSchema.extend(
  mapBoundsSchema.shape,
);

export type OrganizationPaginationParams = z.infer<typeof paginationSchema>;
export type OrganizationMapParams = z.infer<typeof organizationMapSchema>;
export type OrganizationSearchParams = z.infer<typeof organizationSearchSchema>;

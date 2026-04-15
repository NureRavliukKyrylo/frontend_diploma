import { z } from "zod";
import { paginationSchema, locationSchema } from "@shared/config/schemas";

export const organizationSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
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
  Rating: z.number().min(0).max(5).optional().catch(5),
  IncludeArchived: z.boolean().optional().catch(false),
  ShowJoined: z.boolean().optional().catch(false),
});

export const organizationSearchSchema = organizationFiltersSchema
  .extend(paginationSchema.shape)
  .extend(organizationOrderSchema.shape);

export type OrganizationPaginationParams = z.infer<typeof paginationSchema>;
export type OrganizationSearchParams = z.infer<typeof organizationSearchSchema>;

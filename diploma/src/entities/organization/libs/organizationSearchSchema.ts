import z from "zod";

export const organizationPaginationSchema = z.object({
  Page: z.number().min(1).default(1).optional(),
  pageSize: z.number().min(1).default(9).optional(),
});

export const organizationMapSchema = z.object({
  MinLat: z.number().min(-90).max(90).optional(),
  MaxLat: z.number().min(-90).max(90).optional(),
  MinLng: z.number().min(-180).max(180).optional(),
  MaxLng: z.number().min(-180).max(180).optional(),
});

export const organizationSearchBaseSchema = organizationPaginationSchema.extend(
  organizationMapSchema.shape,
);

export type OrganizationPaginationParams = z.infer<
  typeof organizationPaginationSchema
>;
export type OrganizationMapParams = z.infer<typeof organizationMapSchema>;
export type OrganizationSearchParams = z.infer<
  typeof organizationSearchBaseSchema
>;

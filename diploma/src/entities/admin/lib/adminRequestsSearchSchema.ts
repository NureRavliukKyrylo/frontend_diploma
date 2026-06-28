import { z } from "zod";

const requestStatusSchema = z
  .union([z.literal("all"), z.coerce.number().int().min(0).max(6)])
  .default(0)
  .catch(0);

const requestTypeSchema = z
  .union([z.literal("all"), z.coerce.number().int().min(0).max(18)])
  .default("all")
  .catch("all");

export const adminRequestsSearchDefaults = {
  Status: 0 as const,
  Type: "all" as const,
  Tab: "all" as const,
  Page: 1,
  PageSize: 20,
};

export const adminRequestsSearchSchema = z
  .object({
    Search: z.string().optional().catch(undefined),
    Status: requestStatusSchema,
    Type: requestTypeSchema,
    Tab: z
      .enum(["all", "joinLeave", "skillsCategories", "badges", "reportsAppeals"])
      .default(adminRequestsSearchDefaults.Tab)
      .catch(adminRequestsSearchDefaults.Tab),
    Page: z.coerce
      .number()
      .int()
      .min(1)
      .default(adminRequestsSearchDefaults.Page)
      .catch(adminRequestsSearchDefaults.Page),
    PageSize: z.coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(adminRequestsSearchDefaults.PageSize)
      .catch(adminRequestsSearchDefaults.PageSize),
  })
  .catch(adminRequestsSearchDefaults);

export type AdminRequestsSearchParams = z.infer<
  typeof adminRequestsSearchSchema
>;

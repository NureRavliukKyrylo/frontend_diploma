import { paginationSchema } from "@shared/config/schemas";
import { z } from "zod";

export const adminBadgesSearchDefaults = {
  OrderBy: 0 as const,
  Page: 1,
  PageSize: 20,
};

const optionalBooleanSchema = z
  .union([
    z.boolean(),
    z.enum(["true", "false"]).transform((value) => value === "true"),
  ])
  .optional()
  .catch(undefined);

const badgeRankSchema = z.enum(["S", "A", "B", "C", "D", "E", "F"]);

export const adminBadgesSearchSchema = z
  .object({
    Search: z.string().optional().catch(undefined),
    IsArchived: optionalBooleanSchema,
    Ranks: z
      .union([
        z.array(badgeRankSchema),
        badgeRankSchema.transform((value) => [value]),
      ])
      .optional()
      .catch(undefined),
    ScopeEntityType: z
      .enum(["organization", "project", "event", "task"])
      .optional()
      .catch(undefined),
    AutoAwardEnabled: optionalBooleanSchema,
    OrderBy: z.coerce
      .number()
      .int()
      .min(0)
      .max(10)
      .default(adminBadgesSearchDefaults.OrderBy)
      .catch(adminBadgesSearchDefaults.OrderBy),
    Page: paginationSchema.shape.Page
      .default(adminBadgesSearchDefaults.Page)
      .catch(adminBadgesSearchDefaults.Page),
    PageSize: z.coerce
      .number()
      .int()
      .min(1)
      .max(100)
      .default(adminBadgesSearchDefaults.PageSize)
      .catch(adminBadgesSearchDefaults.PageSize),
  })
  .catch(adminBadgesSearchDefaults);

export type AdminBadgesSearchParams = z.infer<typeof adminBadgesSearchSchema>;

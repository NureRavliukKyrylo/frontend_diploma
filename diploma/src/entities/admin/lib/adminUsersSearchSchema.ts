import { paginationSchema } from "@shared/config/schemas";
import { z } from "zod";

const optionalBooleanSchema = z
  .union([
    z.boolean(),
    z.enum(["true", "false"]).transform((value) => value === "true"),
  ])
  .optional()
  .catch(undefined);

export const adminUsersSearchDefaults = {
  OrderBy: "Newest" as const,
  Page: 1,
  PageSize: 12,
};

export const adminUsersSearchSchema = z
  .object({
    Search: z.string().optional().catch(undefined),
    RoleName: z.string().optional().catch(undefined),
    EmailVerified: optionalBooleanSchema,
    GoogleConnected: optionalBooleanSchema,
    RegisteredFrom: z.string().optional().catch(undefined),
    RegisteredTo: z.string().optional().catch(undefined),
    OrderBy: z
      .enum(["Newest", "Oldest", "Email", "Name", "Role"])
      .default(adminUsersSearchDefaults.OrderBy)
      .catch(adminUsersSearchDefaults.OrderBy),
    Page: paginationSchema.shape.Page
      .default(adminUsersSearchDefaults.Page)
      .catch(adminUsersSearchDefaults.Page),
    PageSize: z
      .number()
      .min(1)
      .max(100)
      .default(adminUsersSearchDefaults.PageSize)
      .catch(adminUsersSearchDefaults.PageSize),
  })
  .catch(adminUsersSearchDefaults);

export type AdminUsersSearchParams = z.infer<typeof adminUsersSearchSchema>;

import z from "zod";
import { paginationSchema } from "@shared/config/schemas";

export const skillSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 12,
};

export const skillFiltersSchema = z.object({
  OrderBy: z
    .enum(["Default", "NameAsc", "NameDesc"])
    .default("Default")
    .catch("Default")
    .optional(),
  Search: z.string().optional(),
});

export const skillSearchSchema = skillFiltersSchema
  .extend(paginationSchema.shape)
  .extend({
    PageSize: z.number().min(1).default(12).optional(),
    CategoryIds: z.array(z.string()).optional().catch(undefined),
  });

export type SkillsSearchParams = z.infer<typeof skillSearchSchema>;
export type SkillsInfiniteSearchParams = Pick<
  z.infer<typeof skillSearchSchema>,
  "PageSize" | "Page"
>;

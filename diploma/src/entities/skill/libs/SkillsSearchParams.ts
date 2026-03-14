import z from "zod";
import { paginationSchema } from "@shared/config/schemas";

export const skillSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 7,
};

export const skillFiltersSchema = z.object({
  OrderBy: z
    .enum(["Default", "NameAsc", "NameDesc"])
    .default("Default")
    .catch("Default")
    .optional(),
  Search: z.string().optional(),
  CategoryIds: z.array(z.string()).optional().catch(undefined),
});

export const skillSearchSchema = skillFiltersSchema.extend(
  paginationSchema.shape,
);

export type SkillsSearchParams = z.infer<typeof skillSearchSchema>;

import { z } from "zod";

export const projectSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
};

export const baseProjectSearchSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default"),
  EndBefore: z.string().optional(),
  StartDate: z.string().optional(),
  Rating: z.number().min(0).max(5).optional().catch(5),
  OrganizationId: z.array(z.string()).optional().catch([]),
  RadiusKm: z.number().optional(),
  Search: z.string().optional(),
  Page: z.number().min(1).default(1),
});

export const projectSearchSchema = baseProjectSearchSchema.extend({
  CategoryIds: z.array(z.string()).optional().catch([]),
});

export type ProjectSearchParams = z.infer<typeof projectSearchSchema>;

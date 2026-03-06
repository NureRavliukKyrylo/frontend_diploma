import { z } from "zod";

export const projectSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  pageSize: 9,
  ShowCompleted: false,
  ShowJoined: false,
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
  Lat: z.number().min(-90).max(90).optional(),
  Lng: z.number().min(-180).max(180).optional(),
  Location: z.string().optional(),
  pageSize: z.number().min(1).default(9),
  ShowCompleted: z.boolean().optional().default(false).optional(),
  ShowJoined: z.boolean().optional().default(false).optional(),
});

export const projectSearchSchema = baseProjectSearchSchema.extend({
  CategoryIds: z.array(z.string()).optional().catch([]),
});

export type ProjectSearchParams = z.infer<typeof projectSearchSchema>;

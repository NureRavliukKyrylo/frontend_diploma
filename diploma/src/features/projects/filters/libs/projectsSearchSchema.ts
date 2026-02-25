import { z } from "zod";

export const projectSearchSchema = z.object({
  orderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default"),
  endBefore: z.string().optional(),
  startDate: z.string().optional(),
  rating: z.number().min(0).max(5).optional().catch(5),
  categories: z.array(z.string()).optional().catch([]),
  organizations: z.array(z.string()).optional().catch([]),
  radusKm: z.number().optional(),
  search: z.string().optional(),
  page: z.number().min(1).default(1),
});

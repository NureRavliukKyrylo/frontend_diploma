import { z } from "zod";

export const categoriesSearchDefaults = {
  Page: 1,
  PageSize: 24,
  OrderBy: "Default" as const,
};

export const categoriesSearchSchema = z.object({
  Search: z.string().optional().catch(undefined),
  OrderBy: z
    .enum(["Default", "NameAsc", "NameDesc"])
    .default(categoriesSearchDefaults.OrderBy)
    .catch(categoriesSearchDefaults.OrderBy),
  Page: z.number().min(1).default(1),
  PageSize: z.number().min(1).default(categoriesSearchDefaults.PageSize),
});

export type CategoriesSearchParams = z.input<typeof categoriesSearchSchema>;

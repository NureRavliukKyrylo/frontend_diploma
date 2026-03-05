import { z } from "zod";

export const categoriesSearchDefaults = {
  page: 1,
  pageSize: 8,
};

export const categoriesSearchSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).default(8),
});

export type CategoriesSearchParams = z.input<typeof categoriesSearchSchema>;

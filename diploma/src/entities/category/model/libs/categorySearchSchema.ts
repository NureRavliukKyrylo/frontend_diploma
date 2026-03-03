import { z } from "zod";

export const categoriesSearchDefaults = {
  page: 1,
};

export const categoriesSearchSchema = z.object({
  page: z.number().min(1).default(1),
});

export type CategoriesSearchParams = z.infer<typeof categoriesSearchSchema>;

import { z } from "zod";

export const categoriesSearchDefaults = {
  Page: 1,
  PageSize: 9,
};

export const categoriesSearchSchema = z.object({
  Page: z.number().min(1).default(1),
  PageSize: z.number().min(1).default(9),
});

export type CategoriesSearchParams = z.input<typeof categoriesSearchSchema>;

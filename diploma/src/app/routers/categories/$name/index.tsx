import { createRoute } from "@tanstack/react-router";
import { categoriesRootRoute } from "../route";
import { CategoryDetailPage } from "@pages/categories";
import { z } from "zod";

const categorySearchSchema = z.object({
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  categories: z.array(z.string()).optional().catch([]),
  organizations: z.array(z.string()).optional().catch([]),
  distance: z.number().optional(),
});

export type CategorySearchParams = z.infer<typeof categorySearchSchema>;

export const categoryDetailRoute = createRoute({
  getParentRoute: () => categoriesRootRoute,
  path: "$categoryName",
  component: CategoryDetailPage,
  validateSearch: (search) => categorySearchSchema.parse(search),
});

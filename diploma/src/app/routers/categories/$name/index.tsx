import { createRoute } from "@tanstack/react-router";
import { categoriesRootRoute } from "../route";
import { CategoryDetailPage } from "@pages/categories";

export const categoryDetailRoute = createRoute({
  getParentRoute: () => categoriesRootRoute,
  path: "$categoryName",
  component: CategoryDetailPage,
});

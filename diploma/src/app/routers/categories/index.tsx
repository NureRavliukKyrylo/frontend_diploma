import { createRoute } from "@tanstack/react-router";
import { categoriesRootRoute } from "./route";
import { CategoriesPage } from "@pages/categories";

export const categoriesMainRoute = createRoute({
  getParentRoute: () => categoriesRootRoute,
  path: "/",
  component: CategoriesPage,
});

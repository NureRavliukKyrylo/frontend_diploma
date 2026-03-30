import { CategoriesPage } from "@pages/categories";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/categories/")({
  component: CategoriesPage,
});

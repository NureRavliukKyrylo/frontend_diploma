import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { CategoriesPage } from "@pages/categories";
import {
  categoriesSearchDefaults,
  categoriesSearchSchema,
} from "@entities/category";

export const Route = createFileRoute("/_masterLayout/categories/")({
  component: CategoriesPage,
  validateSearch: categoriesSearchSchema,
  search: {
    middlewares: [stripSearchParams(categoriesSearchDefaults)],
  },
});

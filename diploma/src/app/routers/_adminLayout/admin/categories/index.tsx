import {
  categoriesSearchDefaults,
  categoriesSearchSchema,
} from "@entities/category";
import { AdminCategoriesPage } from "@pages/admin";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/categories/")({
  validateSearch: categoriesSearchSchema,
  search: {
    middlewares: [stripSearchParams(categoriesSearchDefaults)],
  },
  component: AdminCategoriesPage,
});

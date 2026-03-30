import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import {
  categoriesSearchDefaults,
  categoriesSearchSchema,
} from "@entities/category";

export const Route = createFileRoute("/_masterLayout/categories/")({
  validateSearch: categoriesSearchSchema,
  search: {
    middlewares: [stripSearchParams(categoriesSearchDefaults)],
  },
});

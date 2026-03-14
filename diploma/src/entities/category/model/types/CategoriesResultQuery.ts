import type { Category } from "./Category";

export type CategoriesQueryResult = {
  data: Category[] | undefined;
  isLoading?: boolean;
};

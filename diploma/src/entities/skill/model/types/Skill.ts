import type { Category } from "@entities/category";

export interface Skill {
  id: string;
  name: string;
  image: string;
  description: string;
  categoryIds: Pick<Category, "id" | "name">[];
}

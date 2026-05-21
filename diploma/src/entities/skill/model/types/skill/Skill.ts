import type { Category } from "@entities/category";

export interface Skill {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
  categories: Pick<Category, "id" | "name">[];
  level: string;
}

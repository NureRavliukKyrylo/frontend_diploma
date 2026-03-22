import type { Skill } from "@entities/skill";

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  projectsTotal: number;
  projectsActive: number;
  projectsCompleted: number;
  skills: Pick<Skill, "id" | "name">[];
}

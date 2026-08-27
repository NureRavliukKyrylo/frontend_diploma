import type { Skill } from "@entities/skill";

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  activitiesTotal: number;
  activitiesActive: number;
  activitiesCompleted: number;
  skills: Pick<Skill, "id" | "name">[];
}

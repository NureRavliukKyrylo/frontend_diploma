import type { CreateTaskLocation, TaskPolicy } from "../api/createTaskApi";

export interface CreateTaskFormState {
  title: string;
  description: string;
  location: CreateTaskLocation | null;
  startAt: string | null;
  endAt: string | null;
  estimatedMinutes: number | null;
  points: number | null;
  categoryIds: string[];
  joinPolicy: TaskPolicy;
  leavePolicy: TaskPolicy;
}

export interface CreateTaskFormErrors {
  title?: string;
  startAt?: string;
  endAt?: string;
}

export type CreateTaskFormField = Exclude<
  keyof CreateTaskFormState,
  "categoryIds" | "location"
>;

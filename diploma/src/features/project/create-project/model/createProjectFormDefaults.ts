import type { CreateProjectFormState } from "./useCreateProjectForm";

export const INITIAL_STATE: CreateProjectFormState = {
  title: "",
  description: "",
  location: null,
  startAt: null,
  endAt: null,
  categoryIds: [],
  joinPolicy: "open",
  leavePolicy: "approval_required",
};

export const toIsoDate = (value: string | null) =>
  value ? new Date(`${value}T00:00:00`).toISOString() : undefined;

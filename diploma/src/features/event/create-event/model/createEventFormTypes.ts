import type {
  CreateEventLocation,
  CreateEventRecurrence,
  CreateEventSkillRequirement,
  EventPolicy,
} from "../api/createEventApi";

export interface CreateEventFormState {
  title: string;
  description: string;
  location: CreateEventLocation | null;
  startAt: string | null;
  endAt: string | null;
  categoryIds: string[];
  requiredSkills: CreateEventSkillRequirement[];
  joinPolicy: EventPolicy;
  leavePolicy: EventPolicy;
  recurrence: CreateEventRecurrence | null;
}

export interface CreateEventFormErrors {
  title?: string;
  location?: string;
  startAt?: string;
  endAt?: string;
  recurrenceFrequency?: string;
  recurrenceInterval?: string;
  recurrenceUntil?: string;
}

export type CreateEventFormField = Exclude<
  keyof CreateEventFormState,
  "categoryIds" | "location" | "requiredSkills" | "recurrence"
>;

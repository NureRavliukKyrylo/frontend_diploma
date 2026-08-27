export const ModerationSubjectType = {
  user: 0,
  organization: 1,
  project: 2,
  event: 3,
  task: 4,
  offer: 5,
  chatMessage: 6,
  comment: 7,
  feedback: 8,
  other: 9,
} as const;

export type ModerationSubjectType =
  (typeof ModerationSubjectType)[keyof typeof ModerationSubjectType];

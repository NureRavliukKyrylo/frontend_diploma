export const ModerationSubjectType = {
  User: 0,
  Organization: 1,
  Project: 2,
  Event: 3,
  Task: 4,
  Offer: 5,
  ChatMessage: 6,
  Comment: 7,
  Feedback: 8,
  Other: 9,
} as const;

export type ModerationSubjectType =
  (typeof ModerationSubjectType)[keyof typeof ModerationSubjectType];

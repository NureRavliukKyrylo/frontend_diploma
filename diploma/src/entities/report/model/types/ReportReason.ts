export const ReportReasonType = {
  spam: 0,
  harassment: 1,
  hateSpeech: 2,
  misinformation: 3,
  inappropriateContent: 4,
  violence: 5,
  copyright: 6,
  fraud: 7,
  privacyViolation: 8,
  other: 9,
} as const;

export type ReportReasonType =
  (typeof ReportReasonType)[keyof typeof ReportReasonType];

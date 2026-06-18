export const ReportReasonType = {
  Spam: 0,
  Harassment: 1,
  HateSpeech: 2,
  Misinformation: 3,
  InappropriateContent: 4,
  Violence: 5,
  Copyright: 6,
  Fraud: 7,
  PrivacyViolation: 8,
  Other: 9,
} as const;

export type ReportReasonType =
  (typeof ReportReasonType)[keyof typeof ReportReasonType];

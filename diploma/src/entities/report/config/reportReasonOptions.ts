import type { SortOption } from "@shared/config/types";
import type { ReportReason } from "../model/types/ReportReason";

export const reportReasonLabels: Record<ReportReason, string> = {
  Spam: "Spam",
  Harassment: "Harassment or Bullying",
  HateSpeech: "Hate Speech",
  Misinformation: "Misinformation",
  InappropriateContent: "Inappropriate Content",
  Violence: "Violence or Threats",
  Copyright: "Copyright Violation",
  Fraud: "Fraud or Scam",
  PrivacyViolation: "Privacy Violation",
  Other: "Other",
};

export const reportReasons: ReportReason[] = [
  "Spam",
  "Harassment",
  "HateSpeech",
  "Misinformation",
  "InappropriateContent",
  "Violence",
  "Copyright",
  "Fraud",
  "PrivacyViolation",
  "Other",
];

export const reportReasonOptions: SortOption<ReportReason>[] = [
  ...reportReasons.map((value) => ({
    label: reportReasonLabels[value],
    value,
  })),
];

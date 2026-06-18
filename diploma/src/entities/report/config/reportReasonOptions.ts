import type { SortOption } from "@shared/config/types";
import { ReportReasonType } from "../model/types/ReportReason";
import type { TFunction } from "i18next";

const reportReasonKeys: Record<ReportReasonType, string> = {
  [ReportReasonType.Spam]: "Spam",
  [ReportReasonType.Harassment]: "Harassment",
  [ReportReasonType.HateSpeech]: "HateSpeech",
  [ReportReasonType.Misinformation]: "Misinformation",
  [ReportReasonType.InappropriateContent]: "InappropriateContent",
  [ReportReasonType.Violence]: "Violence",
  [ReportReasonType.Copyright]: "Copyright",
  [ReportReasonType.Fraud]: "Fraud",
  [ReportReasonType.PrivacyViolation]: "PrivacyViolation",
  [ReportReasonType.Other]: "Other",
};

export const reportReasons: ReportReasonType[] = [
  ReportReasonType.Spam,
  ReportReasonType.Harassment,
  ReportReasonType.HateSpeech,
  ReportReasonType.Misinformation,
  ReportReasonType.InappropriateContent,
  ReportReasonType.Violence,
  ReportReasonType.Copyright,
  ReportReasonType.Fraud,
  ReportReasonType.PrivacyViolation,
  ReportReasonType.Other,
];

export const getReportReasonOptions = (
  t: TFunction,
): SortOption<ReportReasonType>[] =>
  reportReasons.map((value) => ({
    label: t(`moderation:report.reasons.${reportReasonKeys[value]}`),
    value,
  }));

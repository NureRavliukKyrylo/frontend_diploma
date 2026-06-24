import type { SortOption } from "@shared/config/types";
import { ReportReasonType } from "../model/types/ReportReason";
import type { TFunction } from "i18next";

const reportReasonKeys: Record<ReportReasonType, string> = {
  [ReportReasonType.spam]: "spam",
  [ReportReasonType.harassment]: "harassment",
  [ReportReasonType.hateSpeech]: "hateSpeech",
  [ReportReasonType.misinformation]: "misinformation",
  [ReportReasonType.inappropriateContent]: "inappropriateContent",
  [ReportReasonType.violence]: "violence",
  [ReportReasonType.copyright]: "copyright",
  [ReportReasonType.fraud]: "fraud",
  [ReportReasonType.privacyViolation]: "privacyViolation",
  [ReportReasonType.other]: "other",
};

export const reportReasons: ReportReasonType[] = [
  ReportReasonType.spam,
  ReportReasonType.harassment,
  ReportReasonType.hateSpeech,
  ReportReasonType.misinformation,
  ReportReasonType.inappropriateContent,
  ReportReasonType.violence,
  ReportReasonType.copyright,
  ReportReasonType.fraud,
  ReportReasonType.privacyViolation,
  ReportReasonType.other,
];

export const getReportReasonOptions = (
  t: TFunction,
): SortOption<ReportReasonType>[] =>
  reportReasons.map((value) => ({
    label: t(`moderation:report.reasons.${reportReasonKeys[value]}`),
    value,
  }));

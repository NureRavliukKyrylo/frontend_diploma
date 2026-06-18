import type { ModerationSubjectType } from "./ModerationSubjectType";
import type { ReportReasonType } from "./ReportReason";

export type ReportCase = {
  id: string;
  status: "open" | "resolved" | "rejected";
  subjectType: Lowercase<keyof typeof ModerationSubjectType>;
  reporterUser: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  relatedReported: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  createdAt: string;
  reason: Lowercase<keyof typeof ReportReasonType>;
  subjectId: string;
  details: string;
  entityContent?: string;
  resolvedAt: string;
};

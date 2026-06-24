import type { ModerationSubjectType } from "./ModerationSubjectType";
import type { ReportReasonType } from "./ReportReason";

export type ReportCase = {
  id: string;
  status: "open" | "resolved" | "rejected";
  subjectType: keyof typeof ModerationSubjectType;
  reporter: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
  subject: {
    id: string;
    type: keyof typeof ModerationSubjectType;
    content: string | null;
    title: string;
  };
  createdAt: string;
  reason: keyof typeof ReportReasonType;
  details: string;
  resolvedAt: string;
  reportId: string;
};

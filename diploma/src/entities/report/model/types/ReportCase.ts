import type { ModerationSubjectType } from "./ModerationSubjectType";
import type { ReportReasonType } from "./ReportReason";

type ReportPerson = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type ReportCase = {
  id: string;
  status: "open" | "resolved" | "rejected";
  subjectType: keyof typeof ModerationSubjectType;
  reporter?: ReportPerson;
  reporterUser?: ReportPerson;
  relatedReported?: ReportPerson;
  subject?: {
    id: string;
    type: keyof typeof ModerationSubjectType;
    content: string | null;
    title: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl: string;
    } | null;
  };
  case: {
    id: string;
    status: "opened" | "resolved" | "rejected";
  };
  relatedSubject: {
    type: keyof typeof ModerationSubjectType;
    id: string;
  };
  subjectId?: string;
  createdAt: string;
  reason: keyof typeof ReportReasonType;
  details: string;
  resolvedAt: string;
  reportId: string;
};

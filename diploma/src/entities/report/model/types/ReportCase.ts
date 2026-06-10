import type { ModerationSubjectType } from "./ModerationSubjectType";
import type { ReportReason } from "./ReportReason";

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
  createdAt: string;
  reason: ReportReason;
  subjectId: string;
  details: string;
  entityContent?: string;
};

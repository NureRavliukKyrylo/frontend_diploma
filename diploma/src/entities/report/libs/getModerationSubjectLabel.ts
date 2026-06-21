import { ModerationSubjectType } from "../model";

const subjectTranslationKeys: Record<ModerationSubjectType, string> = {
  [ModerationSubjectType.user]: "User",
  [ModerationSubjectType.organization]: "Organization",
  [ModerationSubjectType.project]: "Project",
  [ModerationSubjectType.event]: "Event",
  [ModerationSubjectType.task]: "Task",
  [ModerationSubjectType.offer]: "Offer",
  [ModerationSubjectType.chatMessage]: "ChatMessage",
  [ModerationSubjectType.comment]: "Comment",
  [ModerationSubjectType.feedback]: "Feedback",
  [ModerationSubjectType.other]: "Other",
};

export const getModerationSubjectKey = (
  type: ModerationSubjectType,
): string => {
  return subjectTranslationKeys[type] ?? "Other";
};

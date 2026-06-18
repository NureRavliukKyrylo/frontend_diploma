import { ModerationSubjectType } from "../model";

const subjectTranslationKeys: Record<ModerationSubjectType, string> = {
  [ModerationSubjectType.User]: "User",
  [ModerationSubjectType.Organization]: "Organization",
  [ModerationSubjectType.Project]: "Project",
  [ModerationSubjectType.Event]: "Event",
  [ModerationSubjectType.Task]: "Task",
  [ModerationSubjectType.Offer]: "Offer",
  [ModerationSubjectType.ChatMessage]: "ChatMessage",
  [ModerationSubjectType.Comment]: "Comment",
  [ModerationSubjectType.Feedback]: "Feedback",
  [ModerationSubjectType.Other]: "Other",
};

export const getModerationSubjectKey = (
  type: ModerationSubjectType,
): string => {
  return subjectTranslationKeys[type] ?? "Other";
};

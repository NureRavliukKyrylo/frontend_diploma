import { ModerationSubjectType } from "../model";

const subjectTranslationKeys: Record<ModerationSubjectType, string> = {
  [ModerationSubjectType.user]: "user",
  [ModerationSubjectType.organization]: "organization",
  [ModerationSubjectType.project]: "project",
  [ModerationSubjectType.event]: "event",
  [ModerationSubjectType.task]: "task",
  [ModerationSubjectType.offer]: "offer",
  [ModerationSubjectType.chatMessage]: "chatMessage",
  [ModerationSubjectType.comment]: "comment",
  [ModerationSubjectType.feedback]: "feedback",
  [ModerationSubjectType.other]: "other",
};

export const getModerationSubjectKey = (
  type: ModerationSubjectType,
): string => {
  return subjectTranslationKeys[type] ?? "other";
};

import { ModerationSubjectType } from "../model";

export const getModerationSubjectLabel = (
  type: ModerationSubjectType,
): string => {
  return (
    Object.keys(ModerationSubjectType).find(
      (key) =>
        ModerationSubjectType[key as keyof typeof ModerationSubjectType] ===
        type,
    ) ?? "Content"
  );
};

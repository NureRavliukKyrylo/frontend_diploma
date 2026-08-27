import { eventKeys } from "@entities/event";
import { feedbackKeys } from "@entities/feedback";
import { offerKeys } from "@entities/offer";
import { organizationKeys } from "@entities/organization";
import { projectKeys } from "@entities/project";
import { ModerationSubjectType } from "@entities/report";
import { taskKeys } from "@entities/task";
import { profileKeys } from "@entities/user/profile";
import type { QueryKey } from "@tanstack/react-query";

export const getModerationSubjectQueryKey = (
  subjectType: ModerationSubjectType,
  subjectId: string,
): QueryKey | null => {
  const map: Partial<Record<ModerationSubjectType, QueryKey>> = {
    [ModerationSubjectType.user]: profileKeys.byId(subjectId),
    [ModerationSubjectType.organization]: organizationKeys.all(),
    [ModerationSubjectType.project]: projectKeys.id(subjectId),
    [ModerationSubjectType.event]: eventKeys.id(subjectId),
    [ModerationSubjectType.task]: taskKeys.id(subjectId),
    [ModerationSubjectType.offer]: offerKeys.id(subjectId),
    [ModerationSubjectType.comment]: taskKeys.all(),
    [ModerationSubjectType.feedback]: feedbackKeys.all(),
  };

  return map[subjectType] ?? null;
};

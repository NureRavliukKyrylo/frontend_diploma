import type { ModerationSubjectType } from "@entities/report";

export const getSubjectLink = (
  type: keyof typeof ModerationSubjectType,
  id: string,
) => {
  switch (type) {
    case "user":
    case "organization":
      return { to: "/organizations/$id" as const, params: { id } };
    case "project":
      return { to: "/projects/$id" as const, params: { id } };
    case "event":
      return { to: "/events/$id" as const, params: { id } };
    case "task":
      return {
        to: "/activities/my" as const,
        search: { tab: "tasks" as const, taskId: id },
      };
    case "offer":
      return { to: "/offers/$id" as const, params: { id } };
    case "chatMessage":
    case "comment":
    case "feedback":
    case "other":
    default:
      return null;
  }
};

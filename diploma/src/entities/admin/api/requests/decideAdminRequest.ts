import { apiClient } from "@shared/api";
import type { AdminRequestDecisionPayload } from "../../model/types/adminRequests";

export const approveAdminRequest = async ({
  requestId,
  typeName,
  comment,
  assignToTask,
}: AdminRequestDecisionPayload) => {
  const body = { comment: comment?.trim() || undefined };

  if (typeName === "skillCreation") {
    await apiClient.post(`Requests/skills/${requestId}/approve`, body);
    return;
  }

  await apiClient.post(`Requests/${requestId}/approve`, body, {
    params:
      typeName === "taskJoin" ? { assignToTask: assignToTask ?? true } : undefined,
  });
};

export const rejectAdminRequest = async ({
  requestId,
  typeName,
  comment,
}: AdminRequestDecisionPayload) => {
  const body = { comment: comment?.trim() || undefined };

  if (typeName === "skillCreation") {
    await apiClient.post(`Requests/skills/${requestId}/reject`, body);
    return;
  }

  await apiClient.post(`Requests/${requestId}/reject`, body);
};

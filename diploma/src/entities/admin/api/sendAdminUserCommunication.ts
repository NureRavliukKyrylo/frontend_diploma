import { apiClient } from "@shared/api";
import {
  asRecord,
  readBooleanPair as readBoolean,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type {
  AdminCommunicationResult,
  AdminUserCommunicationRequest,
} from "../model/types/adminDashboard";

const normalizeAdminCommunicationResult = (
  value: unknown,
): AdminCommunicationResult => {
  const record = asRecord(value);

  return {
    userId: readString(record, "userId", "UserId"),
    emailSent: readBoolean(record, "emailSent", "EmailSent"),
    notificationSent: readBoolean(
      record,
      "notificationSent",
      "NotificationSent",
    ),
  };
};

export const sendAdminUserCommunication = async (
  data: AdminUserCommunicationRequest,
) => {
  const response = await apiClient.post<unknown>(
    "admin/communication/users/send",
    data,
  );

  return normalizeAdminCommunicationResult(response.data);
};

import type { ModerationSubjectType } from "@entities/report";
import type { ReportReason } from "@entities/report/model";
import { apiClient } from "@shared/api";

export type ReportDto = {
  subjectType: ModerationSubjectType;
  subjectId: string;
  reason: ReportReason;
  details: string;
};

export const sendReport = async (data: ReportDto) => {
  const response = await apiClient.post("reports", data);
  return response.data;
};

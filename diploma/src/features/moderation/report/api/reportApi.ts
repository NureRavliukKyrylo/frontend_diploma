import type { ModerationSubjectType } from "@entities/report";
import type { ReportReasonType } from "@entities/report/model";
import { apiClient } from "@shared/api";

export type ReportDto = {
  subjectType: ModerationSubjectType;
  subjectId: string;
  reason: ReportReasonType;
  details: string;
};

export const sendReport = async (data: ReportDto) => {
  const response = await apiClient.post("reports", data);
  return response.data;
};

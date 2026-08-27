import type {
  JoinOrganizationResponse,
  LeaveOrganizationResponse,
} from "../model/types/OrganizationParticipation";
import { normalizeRequestStatus } from "./requestStatus";

type RawParticipationResponse = LeaveOrganizationResponse;

export const extractOrganizationId = (payload: unknown): string | null => {
  if (typeof payload !== "object" || payload === null) return null;

  const value = payload as { id?: string; Id?: string };
  return value.id ?? value.Id ?? null;
};

export const extractOrganizationLogoUrl = (payload: unknown): string | null => {
  if (typeof payload !== "object" || payload === null) return null;

  const value = payload as {
    logoUrl?: string;
    LogoUrl?: string;
    data?: string;
    Data?: string;
  };

  return value.logoUrl ?? value.LogoUrl ?? value.data ?? value.Data ?? null;
};

const normalizeParticipationRequest = (
  request: RawParticipationResponse["request"],
) =>
  request
    ? {
        ...request,
        status: normalizeRequestStatus(request.status) ?? "unknown",
      }
    : undefined;

export const normalizeJoinOrganizationResponse = (
  payload: RawParticipationResponse,
): JoinOrganizationResponse => ({
  mode: payload.mode,
  participationId: payload.participationId ?? null,
  request: normalizeParticipationRequest(payload.request),
});

export const normalizeLeaveOrganizationResponse = (
  payload: RawParticipationResponse,
): LeaveOrganizationResponse => ({
  ...normalizeJoinOrganizationResponse(payload),
  message: payload.message,
});

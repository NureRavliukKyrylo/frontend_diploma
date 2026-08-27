import { useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatKeys } from "@entities/chat";
import {
  approveOrganizationRequest,
  organizationKeys,
  rejectOrganizationRequest,
  unsubscribeOrganizationMember,
  updateOrganizationMemberRole,
} from "@entities/organization";
import { participationKeys } from "@entities/participation";
import { getErrorMessage } from "@shared/libs/error-message";
import type {
  OrganizationMemberCardModel,
  OrganizationRequestCardModel,
} from "@widgets/organizations/members";
import { useTranslation } from "react-i18next";

export interface PendingRequestDecision {
  action: "approve" | "reject";
  request: OrganizationRequestCardModel;
}

export const useOrganizationMemberMutations = (organizationId: string) => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const [memberToRemove, setMemberToRemove] =
    useState<OrganizationMemberCardModel | null>(null);
  const [pendingDecision, setPendingDecision] =
    useState<PendingRequestDecision | null>(null);
  const [activeRoleChangeParticipationId, setActiveRoleChangeParticipationId] =
    useState<string | null>(null);
  const invalidateMembers = () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: participationKeys.members("organization", organizationId),
      }),
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(organizationId),
      }),
    ]);
  const roleChangeMutation = useMutation({
    mutationFn: ({
      member,
      roleId,
    }: {
      member: OrganizationMemberCardModel;
      roleId: string;
    }) => {
      if (!member.participationId) {
        throw new Error(t("memberMutations.missingParticipation"));
      }
      return updateOrganizationMemberRole({
        participationId: member.participationId,
        roleId,
      });
    },
    onMutate: ({ member }) =>
      setActiveRoleChangeParticipationId(member.participationId ?? null),
    onSuccess: async (_, { member }) => {
      await invalidateMembers();
      addToast({
        title: t("memberMutations.roleUpdated"),
        description: t("memberMutations.roleUpdatedText", {
          name: member.fullName,
        }),
        color: "success",
      });
    },
    onError: (error: unknown) =>
      addToast({
        title: t("memberMutations.roleUpdateFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      }),
    onSettled: () => setActiveRoleChangeParticipationId(null),
  });
  const removalMutation = useMutation({
    mutationFn: (member: OrganizationMemberCardModel) =>
      unsubscribeOrganizationMember({
        organizationId,
        userId: member.userId,
      }),
    onSuccess: async () => {
      await Promise.all([
        ...(await invalidateMembers()),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.details(organizationId),
        }),
      ]);
      addToast({ title: t("memberMutations.memberRemoved"), color: "success" });
      setMemberToRemove(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: t("memberMutations.removalFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      }),
  });
  const decisionMutation = useMutation({
    mutationFn: ({
      requestId,
      action,
    }: {
      requestId: string;
      action: PendingRequestDecision["action"];
    }) =>
      action === "approve"
        ? approveOrganizationRequest(requestId)
        : rejectOrganizationRequest(requestId),
    onSuccess: async (_, { action }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationKeys.pendingJoinRequests(organizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.pendingLeaveRequests(organizationId),
        }),
        ...(await invalidateMembers()),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.details(organizationId),
        }),
        action === "approve"
          ? queryClient.invalidateQueries({ queryKey: chatKeys.lists() })
          : Promise.resolve(),
      ]);
      addToast({
        title:
          action === "approve"
            ? t("memberMutations.requestApproved")
            : t("memberMutations.requestRejected"),
        color: "success",
      });
      setPendingDecision(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: t("memberMutations.requestUpdateFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      }),
  });

  return {
    memberToRemove,
    setMemberToRemove,
    pendingDecision,
    setPendingDecision,
    activeRoleChangeParticipationId,
    roleChangeMutation,
    removalMutation,
    decisionMutation,
  };
};

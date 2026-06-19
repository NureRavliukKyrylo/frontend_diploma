import { useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export interface PendingRequestDecision {
  action: "approve" | "reject";
  request: OrganizationRequestCardModel;
}

export const useOrganizationMemberMutations = (organizationId: string) => {
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
        throw new Error("This member does not have a participation record.");
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
        title: "Role updated",
        description: `${member.fullName}'s role has been updated.`,
        color: "success",
      });
    },
    onError: (error: unknown) =>
      addToast({
        title: "Role update failed",
        description: getErrorMessage(error),
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
        ...await invalidateMembers(),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.details(organizationId),
        }),
      ]);
      addToast({ title: "Member removed", color: "success" });
      setMemberToRemove(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: "Removal failed",
        description: getErrorMessage(error),
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
        ...await invalidateMembers(),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.details(organizationId),
        }),
      ]);
      addToast({
        title: action === "approve" ? "Request approved" : "Request rejected",
        color: "success",
      });
      setPendingDecision(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: "Request update failed",
        description: getErrorMessage(error),
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

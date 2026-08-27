import { useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatKeys } from "@entities/chat";
import {
  participationKeys,
  removeParticipationMember,
  updateParticipationRole,
} from "@entities/participation";
import { projectKeys } from "@entities/project";
import {
  approveEntityRequest,
  entityRequestKeys,
  rejectEntityRequest,
} from "@entities/request";
import { getErrorMessage } from "@shared/libs/error-message";
import type {
  OrganizationMemberCardModel,
  OrganizationRequestCardModel,
} from "@widgets/organizations/members";
import { useTranslation } from "react-i18next";

export interface PendingProjectRequestDecision {
  action: "approve" | "reject";
  request: OrganizationRequestCardModel;
}

export const useProjectMemberMutations = (projectId: string) => {
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const [memberToRemove, setMemberToRemove] =
    useState<OrganizationMemberCardModel | null>(null);
  const [pendingDecision, setPendingDecision] =
    useState<PendingProjectRequestDecision | null>(null);
  const [activeRoleChangeParticipationId, setActiveRoleChangeParticipationId] =
    useState<string | null>(null);
  const invalidateMembers = () =>
    queryClient.invalidateQueries({
      queryKey: participationKeys.members("project", projectId),
    });
  const invalidateRequests = () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: entityRequestKeys.pending("project", projectId, "join"),
      }),
      queryClient.invalidateQueries({
        queryKey: entityRequestKeys.pending("project", projectId, "leave"),
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
      return updateParticipationRole({
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
      removeParticipationMember({
        entityType: "project",
        entityId: projectId,
        userId: member.userId,
      }),
    onSuccess: async () => {
      await Promise.all([
        invalidateMembers(),
        queryClient.invalidateQueries({ queryKey: projectKeys.id(projectId) }),
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
      action: PendingProjectRequestDecision["action"];
    }) =>
      action === "approve"
        ? approveEntityRequest(requestId)
        : rejectEntityRequest(requestId),
    onSuccess: async (_, { action }) => {
      await Promise.all([
        invalidateRequests(),
        invalidateMembers(),
        queryClient.invalidateQueries({ queryKey: projectKeys.id(projectId) }),
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

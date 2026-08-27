import { useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  participationKeys,
  removeParticipationMember,
  updateParticipationRole,
} from "@entities/participation";
import type { EntityType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs/error-message";
import type { OrganizationMemberCardModel } from "@widgets/organizations/members";

interface UseEntityMemberMutationsParams {
  entityType: EntityType;
  entityId: string;
  labels: {
    roleUpdated: string;
    roleUpdateFailed: string;
    memberRemoved: string;
    memberRemoveFailed: string;
    missingParticipation: string;
  };
}

export const useEntityMemberMutations = ({
  entityType,
  entityId,
  labels,
}: UseEntityMemberMutationsParams) => {
  const queryClient = useQueryClient();
  const [memberToRemove, setMemberToRemove] =
    useState<OrganizationMemberCardModel | null>(null);
  const [activeRoleChangeParticipationId, setActiveRoleChangeParticipationId] =
    useState<string | null>(null);
  const invalidateMembers = () =>
    queryClient.invalidateQueries({
      queryKey: participationKeys.members(entityType, entityId),
    });
  const roleChangeMutation = useMutation({
    mutationFn: ({
      member,
      roleId,
    }: {
      member: OrganizationMemberCardModel;
      roleId: string;
    }) => {
      if (!member.participationId) {
        throw new Error(labels.missingParticipation);
      }

      return updateParticipationRole({
        participationId: member.participationId,
        roleId,
      });
    },
    onMutate: ({ member }) =>
      setActiveRoleChangeParticipationId(member.participationId ?? null),
    onSuccess: async () => {
      await invalidateMembers();
      addToast({ title: labels.roleUpdated, color: "success" });
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.roleUpdateFailed,
        description: getErrorMessage(error),
        color: "danger",
      }),
    onSettled: () => setActiveRoleChangeParticipationId(null),
  });
  const removalMutation = useMutation({
    mutationFn: (member: OrganizationMemberCardModel) =>
      removeParticipationMember({
        entityType,
        entityId,
        userId: member.userId,
      }),
    onSuccess: async () => {
      await invalidateMembers();
      addToast({ title: labels.memberRemoved, color: "success" });
      setMemberToRemove(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.memberRemoveFailed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });

  return {
    memberToRemove,
    setMemberToRemove,
    activeRoleChangeParticipationId,
    roleChangeMutation,
    removalMutation,
  };
};

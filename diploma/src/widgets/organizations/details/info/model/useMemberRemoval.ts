import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import {
  organizationKeys,
  unsubscribeOrganizationMember,
} from "@entities/organization";
import { getErrorMessage } from "@shared/libs/error-message";
import type { DirectoryMemberCard } from "../lib/helpers";

interface UseOrganizationDetailsMemberRemovalParams {
  organizationId: string;
}

export const useOrganizationDetailsMemberRemoval = ({
  organizationId,
}: UseOrganizationDetailsMemberRemovalParams) => {
  const queryClient = useQueryClient();
  const [memberToRemove, setMemberToRemove] = useState<DirectoryMemberCard | null>(
    null,
  );

  const memberRemovalMutation = useMutation({
    mutationFn: (memberId: string) =>
      unsubscribeOrganizationMember({
        organizationId,
        userId: memberId,
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationKeys.members(organizationId),
        }),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.details(organizationId),
        }),
      ]);

      const removedMemberName = memberToRemove?.name ?? "Team member";
      setMemberToRemove(null);

      addToast({
        title: "Member removed",
        description: `${removedMemberName} has been removed from the organization.`,
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Removal failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const openMemberRemoval = (member: DirectoryMemberCard) => {
    memberRemovalMutation.reset();
    setMemberToRemove(member);
  };

  const closeMemberRemoval = () => {
    memberRemovalMutation.reset();
    setMemberToRemove(null);
  };

  const confirmMemberRemoval = () => {
    if (!memberToRemove) return;
    memberRemovalMutation.mutate(memberToRemove.id);
  };

  return {
    memberToRemove,
    isMemberRemovalModalOpen: Boolean(memberToRemove),
    isMemberRemovalPending: memberRemovalMutation.isPending,
    memberRemovalErrorMessage: memberRemovalMutation.error
      ? getErrorMessage(memberRemovalMutation.error)
      : null,
    requestMemberRemoval: openMemberRemoval,
    closeMemberRemoval,
    confirmMemberRemoval,
  };
};

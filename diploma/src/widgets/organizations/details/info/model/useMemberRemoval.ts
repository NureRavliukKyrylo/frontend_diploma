import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("organizations");
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

      const removedMemberName =
        memberToRemove?.name ?? t("details.labels.teamMember");
      setMemberToRemove(null);

      addToast({
        title: t("details.notifications.memberRemoved"),
        description: t("details.notifications.memberRemovedText", {
          name: removedMemberName,
        }),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("details.notifications.removalFailed"),
        description: getErrorMessage(error, t),
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
      ? getErrorMessage(memberRemovalMutation.error, t)
      : null,
    requestMemberRemoval: openMemberRemoval,
    closeMemberRemoval,
    confirmMemberRemoval,
  };
};

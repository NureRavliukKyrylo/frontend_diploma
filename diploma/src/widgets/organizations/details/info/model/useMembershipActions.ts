import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  isPendingRequestStatus,
  isResolvedRequestStatus,
  joinOrganization,
  leaveOrganization,
  organizationKeys,
  organizationQuery,
} from "@entities/organization";
import { profileKeys, profileQuery } from "@entities/user/profile";

interface UseOrganizationDetailsMembershipActionsParams {
  organizationId: string;
  setIsSubscribed: (value: boolean) => void;
  setIsNotificationsEnabled: (value: boolean) => void;
  closeLeaveModal: () => void;
}

export const useOrganizationDetailsMembershipActions = ({
  organizationId,
  setIsSubscribed,
  setIsNotificationsEnabled,
  closeLeaveModal,
}: UseOrganizationDetailsMembershipActionsParams) => {
  const queryClient = useQueryClient();

  const joinOrganizationMutation = useMutation({
    mutationFn: () => joinOrganization(organizationId),
    onSuccess: async (data) => {
      const joinedDirectly =
        data.mode === "direct" ||
        Boolean(data.participationId) ||
        isResolvedRequestStatus(data.request?.status);

      if (joinedDirectly) {
        setIsSubscribed(true);
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileKeys.all() }),
        queryClient.invalidateQueries({ queryKey: organizationKeys.memberships() }),
        queryClient.invalidateQueries({
          queryKey: organizationKeys.joinRequests(organizationId),
        }),
      ]);

      addToast({
        title: joinedDirectly ? "Joined organization" : "Join request sent",
        description: joinedDirectly
          ? "You have joined this organization."
          : "Your request has been sent for review.",
        color: "success",
      });
    },
    onError: async (error: unknown) => {
      const [refreshedProfile, refreshedMemberships, refreshedJoinRequests] =
        await Promise.all([
          queryClient.fetchQuery(profileQuery.all()),
          queryClient.fetchQuery(organizationQuery.memberships()),
          queryClient.fetchQuery(organizationQuery.joinRequests(organizationId)),
        ]);

      const joinedAfterRefresh = Boolean(
        refreshedProfile?.profile?.organizations?.some(
          (joinedOrganization) => joinedOrganization.organizationId === organizationId,
        ) ||
          refreshedMemberships?.some(
            (membership) =>
              membership.entityId === organizationId && membership.isActive,
          ),
      );
      const pendingAfterRefresh = Boolean(
        refreshedJoinRequests?.some((request) =>
          isPendingRequestStatus(request.status),
        ),
      );

      if (joinedAfterRefresh) {
        setIsSubscribed(true);
        addToast({
          title: "Joined organization",
          description: "You are already a member of this organization.",
          color: "success",
        });
        return;
      }

      if (pendingAfterRefresh) {
        addToast({
          title: "Request already sent",
          description: "Your join request is already pending review.",
          color: "warning",
        });
        return;
      }

      addToast({
        title: "Join failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const leaveOrganizationMutation = useMutation({
    mutationFn: () => leaveOrganization(organizationId),
    onSuccess: async (data) => {
      const leftDirectly =
        data.mode === "direct" || isResolvedRequestStatus(data.request?.status);

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileKeys.all() }),
        queryClient.invalidateQueries({ queryKey: organizationKeys.all() }),
      ]);

      if (leftDirectly) {
        setIsSubscribed(false);
        setIsNotificationsEnabled(false);
      }

      closeLeaveModal();

      addToast({
        title: leftDirectly ? "Left organization" : "Leave request sent",
        description: leftDirectly
          ? "You have left this organization."
          : "Your request to leave has been sent for review.",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Leave failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const resetLeave = () => leaveOrganizationMutation.reset();

  return {
    leaveOrganizationErrorMessage: leaveOrganizationMutation.error
      ? getErrorMessage(leaveOrganizationMutation.error)
      : null,
    isJoinPending: joinOrganizationMutation.isPending,
    isLeavePending: leaveOrganizationMutation.isPending,
    requestJoin: () => joinOrganizationMutation.mutate(),
    confirmLeave: () => leaveOrganizationMutation.mutate(),
    resetLeave,
  };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { addToast } from "@heroui/react";
import { chatKeys } from "@entities/chat";
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
  const { t } = useTranslation("organizations");
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
        joinedDirectly
          ? queryClient.invalidateQueries({ queryKey: chatKeys.lists() })
          : Promise.resolve(),
      ]);

      addToast({
        title: joinedDirectly
          ? t("details.notifications.joined")
          : t("details.notifications.joinRequested"),
        description: joinedDirectly
          ? t("details.notifications.joinedText")
          : t("details.notifications.joinRequestedText"),
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
        await queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
        addToast({
          title: t("details.notifications.joined"),
          description: t("details.notifications.alreadyMemberText"),
          color: "success",
        });
        return;
      }

      if (pendingAfterRefresh) {
        addToast({
          title: t("details.notifications.requestAlreadySent"),
          description: t("details.notifications.requestAlreadyPending"),
          color: "warning",
        });
        return;
      }

      addToast({
        title: t("details.notifications.joinFailed"),
        description: getErrorMessage(error, t),
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
        title: leftDirectly
          ? t("details.notifications.left")
          : t("details.notifications.leaveRequested"),
        description: leftDirectly
          ? t("details.notifications.leftText")
          : t("details.notifications.leaveRequestedText"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("details.notifications.leaveFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const resetLeave = () => leaveOrganizationMutation.reset();

  return {
    leaveOrganizationErrorMessage: leaveOrganizationMutation.error
      ? getErrorMessage(leaveOrganizationMutation.error, t)
      : null,
    isJoinPending: joinOrganizationMutation.isPending,
    isLeavePending: leaveOrganizationMutation.isPending,
    requestJoin: () => joinOrganizationMutation.mutate(),
    confirmLeave: () => leaveOrganizationMutation.mutate(),
    resetLeave,
  };
};

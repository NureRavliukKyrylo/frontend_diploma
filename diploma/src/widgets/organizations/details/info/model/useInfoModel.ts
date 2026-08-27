import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";
import { addToast } from "@heroui/react";
import type { Organization, OrganizationMember } from "@entities/organization";
import type { OrganizationDetailsTab } from "../config/tabs";
import { createOrganizationDetailsAnimationConfig } from "../lib/animation";
import { useOrganizationDetailsAccess } from "./useAccess";
import { useOrganizationDetailsDerivedData } from "./useDerivedData";
import { useOrganizationDetailsMemberRemoval } from "./useMemberRemoval";
import { useOrganizationDetailsMembershipActions } from "./useMembershipActions";
import { useOrganizationDetailsUiState } from "./useUiState";

interface UseOrganizationDetailsInfoModelParams {
  organization: Organization;
  members: OrganizationMember[];
  canManageOrganization: boolean;
  canViewMembersTab: boolean;
  activeTab: OrganizationDetailsTab;
  onTabChange: (nextTab: OrganizationDetailsTab) => void;
}

export const useOrganizationDetailsInfoModel = ({
  organization,
  members,
  canManageOrganization,
  canViewMembersTab,
  activeTab,
  onTabChange,
}: UseOrganizationDetailsInfoModelParams) => {
  const { t } = useTranslation("organizations");
  const prefersReducedMotion = Boolean(useReducedMotion());
  const animation = useMemo(
    () => createOrganizationDetailsAnimationConfig(prefersReducedMotion),
    [prefersReducedMotion],
  );
  const navigate = useNavigate({ from: "/organizations/$id/" });
  const {
    descriptionExpanded,
    setDescriptionExpanded,
    isSubscribed,
    setIsSubscribed,
    isNotificationsEnabled,
    setIsNotificationsEnabled,
    showMeta,
    setShowMeta,
    isLeaveModalOpen,
    setIsLeaveModalOpen,
  } = useOrganizationDetailsUiState();
  const access = useOrganizationDetailsAccess({
    organization,
    canViewMembersTab,
    activeTab,
    onTabChange,
  });
  const derivedData = useOrganizationDetailsDerivedData({
    organization,
    members,
  });
  const memberRemoval = useOrganizationDetailsMemberRemoval({
    organizationId: organization.id,
  });

  const membershipActions = useOrganizationDetailsMembershipActions({
    organizationId: organization.id,
    setIsSubscribed,
    setIsNotificationsEnabled,
    closeLeaveModal: () => setIsLeaveModalOpen(false),
  });

  useEffect(() => {
    setIsSubscribed(access.isJoinedOrganization);
  }, [access.isJoinedOrganization, setIsSubscribed]);

  useEffect(() => {
    if (activeTab !== "overview" && showMeta) {
      setShowMeta(false);
    }
  }, [activeTab, setShowMeta, showMeta]);

  useEffect(() => {
    if (canManageOrganization && showMeta) {
      setShowMeta(false);
    }
  }, [canManageOrganization, setShowMeta, showMeta]);

  const isMetaVisible =
    showMeta && activeTab === "overview" && !canManageOrganization;

  const closeLeaveModal = () => {
    membershipActions.resetLeave();
    setIsLeaveModalOpen(false);
  };

  const requestMemberUnsubscribe = (member: (typeof derivedData.memberDirectoryCards)[number]) => {
    if (member.id === access.currentUserId) {
      if (!access.isJoinedOrganization) {
        addToast({
          title: t("details.notifications.leaveUnavailable"),
          description: t("details.notifications.notActiveMember"),
          color: "warning",
        });
        return;
      }

      setIsLeaveModalOpen(true);
      return;
    }

    memberRemoval.requestMemberRemoval(member);
  };

  return {
    animation,
    prefersReducedMotion,
    availableTabs: access.availableTabs,
    currentUserId: access.currentUserId,
    canManageMembers: canManageOrganization,
    canSelfUnsubscribe: access.isJoinedOrganization,
    isMetaVisible,
    ...derivedData,
    isSubscriptionResolutionPending: access.isSubscriptionResolutionPending,
    isOrganizationOwner: access.isOrganizationOwner,
    isSubscribed,
    hasPendingJoinRequest: access.hasPendingJoinRequest,
    isNotificationsEnabled,
    isLeaveModalOpen,
    leaveOrganizationErrorMessage: membershipActions.leaveOrganizationErrorMessage,
    isJoinPending: membershipActions.isJoinPending,
    isLeavePending: membershipActions.isLeavePending,
    descriptionExpanded,
    toggleDescription: () => setDescriptionExpanded((prev) => !prev),
    toggleNotifications: () => setIsNotificationsEnabled((prev) => !prev),
    requestJoin: membershipActions.requestJoin,
    requestUnsubscribe: () => setIsLeaveModalOpen(true),
    closeLeaveModal,
    confirmLeave: membershipActions.confirmLeave,
    memberToRemove: memberRemoval.memberToRemove,
    isMemberRemovalModalOpen: memberRemoval.isMemberRemovalModalOpen,
    isMemberRemovalPending: memberRemoval.isMemberRemovalPending,
    memberRemovalErrorMessage: memberRemoval.memberRemovalErrorMessage,
    requestMemberRemoval: requestMemberUnsubscribe,
    closeMemberRemoval: memberRemoval.closeMemberRemoval,
    confirmMemberRemoval: memberRemoval.confirmMemberRemoval,
    toggleMeta: () => setShowMeta((prev) => !prev),
    openSettings: () =>
      navigate({
        to: "/organizations/$id/settings",
        params: { id: organization.id },
      }),
    scrollToProjects: () =>
      document.getElementById("organization-projects-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
  };
};

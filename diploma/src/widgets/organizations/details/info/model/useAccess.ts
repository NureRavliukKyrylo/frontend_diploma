import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@entities/user";
import {
  isPendingRequestStatus,
  organizationQuery,
  type Organization,
} from "@entities/organization";
import { profileQuery } from "@entities/user/profile";
import {
  organizationDetailsTabs,
  type OrganizationDetailsTab,
} from "../config/tabs";

interface UseOrganizationDetailsAccessParams {
  organization: Organization;
  canViewMembersTab: boolean;
  activeTab: OrganizationDetailsTab;
  onTabChange: (nextTab: OrganizationDetailsTab) => void;
}

export const useOrganizationDetailsAccess = ({
  organization,
  activeTab,
  onTabChange,
}: UseOrganizationDetailsAccessParams) => {
  const storedUserId = useUserStore((state) => state.userId);
  const setUserId = useUserStore((state) => state.setUserId);

  const { data: currentUser, isLoading: isUserLoading } = useQuery(profileQuery.all());
  const currentUserId = storedUserId?.trim() || currentUser?.id?.trim();

  const { data: ownedOrganizationsResponse, isLoading: isOwnedOrganizationsLoading } =
    useQuery({
      ...organizationQuery.my({
        Page: 1,
        pageSize: 200,
      }),
      enabled: Boolean(currentUserId),
    });

  const { data: memberships = [], isLoading: isMembershipsLoading } = useQuery(
    organizationQuery.memberships(),
  );
  const { data: joinRequests = [], isLoading: isJoinRequestsLoading } = useQuery(
    organizationQuery.joinRequests(organization.id),
  );

  const isOwnerResolutionPending = !currentUserId && isUserLoading;
  const isOwnerByIdMatch = Boolean(
    currentUserId &&
      organization.ownerId &&
      currentUserId.trim() === organization.ownerId.trim(),
  );
  const isOwnerByOwnedOrganizations = Boolean(
    ownedOrganizationsResponse?.data?.some(
      (ownedOrganization) => ownedOrganization.id === organization.id,
    ),
  );
  const isOrganizationOwner = isOwnerByIdMatch || isOwnerByOwnedOrganizations;

  const isJoinedByProfile = Boolean(
    currentUser?.profile?.organizations?.some(
      (joinedOrganization) => joinedOrganization.organizationId === organization.id,
    ),
  );
  const isJoinedByMembership = memberships.some(
    (membership) => membership.entityId === organization.id && membership.isActive,
  );
  const hasPendingJoinRequest = joinRequests.some((request) =>
    isPendingRequestStatus(request.status),
  );
  const isJoinedOrganization = isJoinedByProfile || isJoinedByMembership;
  const isSubscriptionResolutionPending =
    isOwnerResolutionPending ||
    (Boolean(currentUserId) && isOwnedOrganizationsLoading) ||
    isMembershipsLoading ||
    isJoinRequestsLoading;
  const hasProjects =
    (organization.activeProjects ?? 0) > 0 ||
    (organization.projects?.length ?? 0) > 0;
  const hasEvents = (organization.activeEvents ?? 0) > 0;
  const hasTasks = (organization.activeTasks ?? 0) > 0;

  const availableTabs = useMemo(
    () =>
      organizationDetailsTabs.filter((tab) => {
        if (tab.value === "projects") return hasProjects;
        if (tab.value === "events") return hasEvents;
        if (tab.value === "tasks") return hasTasks;

        return true;
      }),
    [hasEvents, hasProjects, hasTasks],
  );

  useEffect(() => {
    if (!availableTabs.some((tab) => tab.value === activeTab)) {
      onTabChange("overview");
    }
  }, [activeTab, availableTabs, onTabChange]);

  useEffect(() => {
    if (!storedUserId && currentUser?.id) {
      setUserId(currentUser.id);
    }
  }, [currentUser?.id, setUserId, storedUserId]);

  return {
    availableTabs,
    currentUserId: currentUserId ?? null,
    isOrganizationOwner,
    isJoinedOrganization,
    hasPendingJoinRequest,
    isSubscriptionResolutionPending,
  };
};

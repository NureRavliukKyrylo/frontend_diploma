import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { organizationQuery } from "@entities/organization";
import {
  participationQuery,
  type ParticipationListItem,
} from "@entities/participation";
import { useUserStore } from "@entities/user";
import { profileQuery, type User } from "@entities/user/profile";
import {
  buildMemberCards,
  buildMembersByUserId,
} from "../lib/memberViewModels";
import { buildRequestCards } from "../lib/requestViewModels";

export const useOrganizationMembersData = (organizationId: string) => {
  const storedUserId = useUserStore((state) => state.userId);
  const currentUserQuery = useQuery(profileQuery.all());
  const currentUser = currentUserQuery.data;
  const currentUserId = storedUserId?.trim() || currentUser?.id?.trim() || null;
  const organizationQueryResult = useQuery(
    organizationQuery.byId(organizationId),
  );
  const organization = organizationQueryResult.data;
  const isOwner = Boolean(
    currentUserId &&
      organization?.ownerId &&
      currentUserId === organization.ownerId.trim(),
  );
  const editAccessQuery = useQuery({
    ...organizationQuery.editAccess(organizationId),
    enabled: Boolean(organizationId) && Boolean(organization) && !isOwner,
    retry: false,
  });
  const canLoad = Boolean(organization && (isOwner || editAccessQuery.data));
  const membersQuery = useQuery({
    ...participationQuery.members({
      entityType: "organization",
      entityId: organizationId,
      page: 1,
      pageSize: 500,
    }),
    enabled: canLoad,
    retry: false,
  });
  const joinRequestsQuery = useQuery({
    ...organizationQuery.pendingJoinRequests(organizationId),
    enabled: canLoad,
    retry: false,
  });
  const leaveRequestsQuery = useQuery({
    ...organizationQuery.pendingLeaveRequests(organizationId),
    enabled: canLoad,
    retry: false,
  });
  const rolesQuery = useQuery({
    ...organizationQuery.contextRoles(organizationId),
    enabled: canLoad,
    retry: false,
  });
  const rawMembers = useMemo(
    () => membersQuery.data?.data ?? [],
    [membersQuery.data?.data],
  );
  const joinRequests = useMemo(
    () => joinRequestsQuery.data ?? [],
    [joinRequestsQuery.data],
  );
  const leaveRequests = useMemo(
    () => leaveRequestsQuery.data ?? [],
    [leaveRequestsQuery.data],
  );
  const userIds = useMemo(() => {
    const ids = new Set(rawMembers.map((member) => member.userId));
    joinRequests.forEach((request) => ids.add(request.userId));
    leaveRequests.forEach((request) => ids.add(request.userId));
    if (organization?.ownerId) ids.add(organization.ownerId);
    return [...ids];
  }, [joinRequests, leaveRequests, organization?.ownerId, rawMembers]);
  const profileQueries = useQueries({
    queries: userIds.map((userId) => ({
      ...profileQuery.byId(userId),
      enabled: canLoad,
      retry: false,
      staleTime: 5 * 60 * 1000,
    })),
  });
  const userById = useMemo(() => {
    const map = new Map<string, User | null>();
    userIds.forEach((userId, index) => {
      map.set(userId, profileQueries[index]?.data ?? null);
    });
    return map;
  }, [profileQueries, userIds]);
  const membersByUserId = useMemo(
    () =>
      buildMembersByUserId({
        rawMembers: rawMembers as ParticipationListItem[],
        organization: organization ?? undefined,
        userById,
        currentUser,
        currentUserId,
      }),
    [currentUser, currentUserId, organization, rawMembers, userById],
  );
  const memberCards = useMemo(
    () => buildMemberCards(membersByUserId, userById, organization?.ownerId),
    [membersByUserId, organization?.ownerId, userById],
  );
  const requestCards = useMemo(
    () => [
      ...buildRequestCards(joinRequests, "join", membersByUserId, userById),
      ...buildRequestCards(leaveRequests, "leave", membersByUserId, userById),
    ],
    [joinRequests, leaveRequests, membersByUserId, userById],
  );
  const roles = useMemo(
    () =>
      (rolesQuery.data ?? []).filter(
        (role) =>
          role.entityType === "organization" &&
          role.entityId === organizationId &&
          role.isActive &&
          !role.archivedAt,
      ),
    [organizationId, rolesQuery.data],
  );

  return {
    organization,
    currentUserId,
    isOwner,
    canEdit: editAccessQuery.data ?? false,
    isEditAccessLoading: editAccessQuery.isLoading,
    isOrganizationPending: organizationQueryResult.isPending,
    isOrganizationError: organizationQueryResult.isError,
    isMembersError: membersQuery.isError,
    memberCards,
    requestCards,
    roles,
  };
};

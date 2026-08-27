import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  contextRoleQuery,
  organizationQuery,
} from "@entities/organization";
import {
  participationQuery,
  type ParticipationListItem,
} from "@entities/participation";
import { projectQuery } from "@entities/project";
import {
  pendingEntityRequestsQuery,
} from "@entities/request";
import { useUserStore } from "@entities/user";
import { profileQuery, type User } from "@entities/user/profile";
import {
  buildMemberCards,
  buildMembersByUserId,
} from "@pages/organizations/members/lib/memberViewModels";
import { buildRequestCards } from "@pages/organizations/members/lib/requestViewModels";
import { canManageProjectMembers } from "@widgets/projects/details/lib/projectPermissions";
import { useProjectPermissionContext } from "@widgets/projects";

export const useProjectMembersData = (projectId: string) => {
  const { t, i18n } = useTranslation("common");
  const storedUserId = useUserStore((state) => state.userId);
  const currentUserQuery = useQuery(profileQuery.all());
  const currentUser = currentUserQuery.data;
  const currentUserId = storedUserId?.trim() || currentUser?.id?.trim() || null;
  const projectResult = useQuery(projectQuery.id(projectId));
  const project = projectResult.data;
  const permissionContext = useProjectPermissionContext(project);
  const organizationId = project?.organizationId?.trim() ?? "";
  const organizationResult = useQuery({
    ...organizationQuery.byId(organizationId),
    enabled: Boolean(organizationId),
  });
  const organization = organizationResult.data;
  const isOwner = permissionContext.isOrganizationOwner === true;
  const canEdit = canManageProjectMembers(project, permissionContext);
  const isEditAccessLoading =
    projectResult.isPending || permissionContext.isLoading === true;
  const canLoad = Boolean(project && !isEditAccessLoading && canEdit);
  const membersQuery = useQuery({
    ...participationQuery.members({
      entityType: "project",
      entityId: projectId,
      page: 1,
      pageSize: 500,
    }),
    enabled: canLoad,
    retry: false,
  });
  const joinRequestsQuery = useQuery({
    ...pendingEntityRequestsQuery("project", projectId, "join"),
    enabled: canLoad,
  });
  const leaveRequestsQuery = useQuery({
    ...pendingEntityRequestsQuery("project", projectId, "leave"),
    enabled: canLoad,
  });
  const rolesQuery = useQuery({
    ...contextRoleQuery.entity("project", projectId),
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
  const ownerId = organization?.ownerId?.trim() ?? null;
  const userIds = useMemo(() => {
    const ids = new Set(rawMembers.map((member) => member.userId));
    joinRequests.forEach((request) => ids.add(request.userId));
    leaveRequests.forEach((request) => ids.add(request.userId));
    if (ownerId) ids.add(ownerId);
    return [...ids];
  }, [joinRequests, leaveRequests, ownerId, rawMembers]);
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
        entityType: "project",
        entityId: projectId,
        ownerId,
        createdAt: project?.startAt,
        userById,
        currentUser,
        currentUserId,
        ownerLabel: t("member.ownerLabel"),
      }),
    [
      currentUser,
      currentUserId,
      ownerId,
      project?.startAt,
      projectId,
      rawMembers,
      t,
      userById,
    ],
  );
  const memberCards = useMemo(
    () =>
      buildMemberCards(membersByUserId, userById, ownerId, t, i18n.language),
    [i18n.language, membersByUserId, ownerId, t, userById],
  );
  const requestCards = useMemo(
    () => [
      ...buildRequestCards(
        joinRequests,
        "join",
        membersByUserId,
        userById,
        t,
      ),
      ...buildRequestCards(
        leaveRequests,
        "leave",
        membersByUserId,
        userById,
        t,
      ),
    ],
    [joinRequests, leaveRequests, membersByUserId, t, userById],
  );
  const roles = useMemo(
    () =>
      (rolesQuery.data ?? []).filter(
        (role) =>
          role.entityType === "project" &&
          role.entityId === projectId &&
          role.isActive &&
          !role.archivedAt,
      ),
    [projectId, rolesQuery.data],
  );

  return {
    project,
    organization,
    currentUserId,
    isOwner,
    canEdit,
    isEditAccessLoading,
    isProjectPending: projectResult.isPending,
    isProjectError: projectResult.isError,
    isOrganizationPending:
      Boolean(organizationId) && organizationResult.isPending,
    isOrganizationError:
      Boolean(organizationId) && organizationResult.isError,
    isMembersError:
      membersQuery.isError ||
      joinRequestsQuery.isError ||
      leaveRequestsQuery.isError ||
      rolesQuery.isError,
    memberCards,
    requestCards,
    roles,
  };
};

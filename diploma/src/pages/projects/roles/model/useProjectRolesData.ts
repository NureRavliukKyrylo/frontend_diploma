import { useMemo } from "react";
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
import { profileQuery, type User } from "@entities/user/profile";
import {
  buildMembersByRoleId,
  groupContextRoles,
} from "@pages/organizations/roles/lib/roleViewModels";

export const useProjectRolesData = (
  projectId: string,
  canLoad: boolean,
) => {
  const projectResult = useQuery(projectQuery.id(projectId));
  const project = projectResult.data;
  const organizationId = project?.organizationId?.trim() ?? "";
  const organizationResult = useQuery({
    ...organizationQuery.byId(organizationId),
    enabled: Boolean(organizationId),
  });
  const activeRolesResult = useQuery({
    ...contextRoleQuery.entity("project", projectId),
    retry: false,
    enabled: canLoad,
  });
  const archivedRolesResult = useQuery({
    ...contextRoleQuery.entity("project", projectId, true),
    retry: false,
    enabled: canLoad,
  });
  const templatesResult = useQuery({
    ...contextRoleQuery.templates("project"),
    retry: false,
    enabled: canLoad,
  });
  const membersResult = useQuery({
    ...participationQuery.members({
      entityType: "project",
      entityId: projectId,
      page: 1,
      pageSize: 500,
    }),
    retry: false,
    enabled: canLoad && activeRolesResult.isSuccess,
  });
  const members = useMemo(
    () => (membersResult.data?.data ?? []) as ParticipationListItem[],
    [membersResult.data?.data],
  );
  const profileResults = useQueries({
    queries: members.map((member) => ({
      ...profileQuery.byId(member.userId),
      enabled: canLoad && activeRolesResult.isSuccess,
      retry: false,
      staleTime: 5 * 60 * 1000,
    })),
  });
  const profilesByUserId = useMemo(() => {
    const map = new Map<string, User | null>();
    members.forEach((member, index) => {
      map.set(member.userId, profileResults[index]?.data ?? null);
    });
    return map;
  }, [members, profileResults]);
  const groupedRoles = useMemo(
    () =>
      groupContextRoles(
        activeRolesResult.data ?? [],
        archivedRolesResult.data ?? [],
        "project",
        projectId,
      ),
    [activeRolesResult.data, archivedRolesResult.data, projectId],
  );
  const membersByRoleId = useMemo(
    () => buildMembersByRoleId(members),
    [members],
  );

  return {
    project,
    organization: organizationResult.data,
    isProjectPending: projectResult.isPending,
    isProjectError: projectResult.isError,
    isOrganizationPending:
      Boolean(organizationId) && organizationResult.isPending,
    isOrganizationError:
      Boolean(organizationId) && organizationResult.isError,
    activeRolesResult,
    templatesResult,
    templateRoles: templatesResult.data ?? [],
    members,
    membersByRoleId,
    profilesByUserId,
    ...groupedRoles,
  };
};

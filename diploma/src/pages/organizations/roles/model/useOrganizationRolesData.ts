import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { organizationQuery } from "@entities/organization";
import {
  participationQuery,
  type ParticipationListItem,
} from "@entities/participation";
import { profileQuery, type User } from "@entities/user/profile";
import {
  buildMembersByRoleId,
  groupOrganizationRoles,
} from "../lib/roleViewModels";

export const useOrganizationRolesData = (organizationId: string) => {
  const organizationResult = useQuery(organizationQuery.byId(organizationId));
  const activeRolesResult = useQuery({
    ...organizationQuery.contextRoles(organizationId),
    retry: false,
    enabled: Boolean(organizationId),
  });
  const archivedRolesResult = useQuery({
    ...organizationQuery.contextRoles(organizationId, true),
    retry: false,
    enabled: Boolean(organizationId),
  });
  const templatesResult = useQuery({
    ...organizationQuery.contextRoleTemplates("organization"),
    retry: false,
    enabled: Boolean(organizationId),
  });
  const membersResult = useQuery({
    ...participationQuery.members({
      entityType: "organization",
      entityId: organizationId,
      page: 1,
      pageSize: 500,
    }),
    retry: false,
    enabled: activeRolesResult.isSuccess,
  });
  const members = useMemo(
    () => (membersResult.data?.data ?? []) as ParticipationListItem[],
    [membersResult.data?.data],
  );
  const profileResults = useQueries({
    queries: members.map((member) => ({
      ...profileQuery.byId(member.userId),
      enabled: activeRolesResult.isSuccess,
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
      groupOrganizationRoles(
        activeRolesResult.data ?? [],
        archivedRolesResult.data ?? [],
        organizationId,
      ),
    [activeRolesResult.data, archivedRolesResult.data, organizationId],
  );
  const membersByRoleId = useMemo(
    () => buildMembersByRoleId(members),
    [members],
  );

  return {
    organization: organizationResult.data,
    isOrganizationPending: organizationResult.isPending,
    isOrganizationError: organizationResult.isError,
    activeRolesResult,
    templatesResult,
    templateRoles: templatesResult.data ?? [],
    members,
    membersByRoleId,
    profilesByUserId,
    ...groupedRoles,
  };
};

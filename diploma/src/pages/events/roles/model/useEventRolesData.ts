import { useMemo } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { eventQuery } from "@entities/event";
import {
  contextRoleQuery,
  organizationQuery,
} from "@entities/organization";
import {
  participationQuery,
  type ParticipationListItem,
} from "@entities/participation";
import { profileQuery, type User } from "@entities/user/profile";
import {
  buildMembersByRoleId,
  groupContextRoles,
} from "@pages/organizations/roles/lib/roleViewModels";

export const useEventRolesData = (eventId: string, canLoad: boolean) => {
  const eventResult = useQuery(eventQuery.id(eventId));
  const event = eventResult.data;
  const organizationId = event?.organizationId?.trim() ?? "";
  const organizationResult = useQuery({
    ...organizationQuery.byId(organizationId),
    enabled: Boolean(organizationId),
  });
  const activeRolesResult = useQuery({
    ...contextRoleQuery.entity("event", eventId),
    retry: false,
    enabled: canLoad,
  });
  const archivedRolesResult = useQuery({
    ...contextRoleQuery.entity("event", eventId, true),
    retry: false,
    enabled: canLoad,
  });
  const templatesResult = useQuery({
    ...contextRoleQuery.templates("event"),
    retry: false,
    enabled: canLoad,
  });
  const membersResult = useQuery({
    ...participationQuery.members({
      entityType: "event",
      entityId: eventId,
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
        "event",
        eventId,
      ),
    [activeRolesResult.data, archivedRolesResult.data, eventId],
  );
  const membersByRoleId = useMemo(
    () => buildMembersByRoleId(members),
    [members],
  );

  return {
    event,
    organization: organizationResult.data,
    isEventPending: eventResult.isPending,
    isEventError: eventResult.isError,
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

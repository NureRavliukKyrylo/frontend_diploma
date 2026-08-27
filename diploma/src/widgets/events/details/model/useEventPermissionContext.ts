import { useQuery } from "@tanstack/react-query";
import { organizationQuery } from "@entities/organization";
import type { Event } from "@entities/event";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import type { EventPermissionContext } from "../lib/eventPermissions";

export const useEventPermissionContext = (
  event: Event | undefined,
): EventPermissionContext => {
  const storedUserId = useUserStore((state) => state.userId)?.trim();
  const systemRole = useUserStore((state) => state.systemRole);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const shouldLoadProfile = Boolean(isAuthenticated && !storedUserId);
  const currentUserResult = useQuery({
    ...profileQuery.all(),
    enabled: shouldLoadProfile,
  });
  const currentUserId =
    storedUserId || currentUserResult.data?.id?.trim() || null;
  const organizationId = event?.organizationId?.trim() ?? "";
  const organizationResult = useQuery({
    ...organizationQuery.byId(organizationId),
    enabled: Boolean(organizationId),
  });
  const ownerId = organizationResult.data?.ownerId?.trim();

  return {
    isOrganizationOwner: Boolean(
      currentUserId && ownerId && currentUserId === ownerId,
    ),
    systemRole,
    isLoading:
      (Boolean(organizationId) && organizationResult.isPending) ||
      (shouldLoadProfile && currentUserResult.isPending),
  };
};

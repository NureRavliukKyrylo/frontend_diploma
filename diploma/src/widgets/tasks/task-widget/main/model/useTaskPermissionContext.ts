import { organizationQuery } from "@entities/organization";
import type { Task } from "@entities/task";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { useQuery } from "@tanstack/react-query";
import type { TaskPermissionContext } from "../lib/canManageTask";

export const useTaskPermissionContext = (
  task: Task | undefined,
): TaskPermissionContext => {
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
  const organizationId =
    task?.organizationId?.trim() || task?.organization?.id?.trim() || "";
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

import { useQuery } from "@tanstack/react-query";
import { organizationQuery } from "@entities/organization";
import type { Project } from "@entities/project";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import type { ProjectPermissionContext } from "../lib/projectPermissions";

export const useProjectPermissionContext = (
  project: Project | undefined,
): ProjectPermissionContext => {
  const storedUserId = useUserStore((state) => state.userId)?.trim();
  const systemRole = useUserStore((state) => state.systemRole);
  const currentUserResult = useQuery(profileQuery.all());
  const currentUserId =
    storedUserId || currentUserResult.data?.id?.trim() || null;
  const organizationId = project?.organizationId?.trim() ?? "";
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
      (!storedUserId && currentUserResult.isPending),
  };
};

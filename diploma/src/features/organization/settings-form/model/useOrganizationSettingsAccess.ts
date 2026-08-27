import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { organizationQuery } from "@entities/organization";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";

export const useOrganizationSettingsAccess = (organizationId: string) => {
  const navigate = useNavigate();
  const storedUserId = useUserStore((state) => state.userId);
  const { data: currentUser } = useQuery(profileQuery.all());
  const {
    data: organization,
    isError,
    isPending,
  } = useQuery(organizationQuery.byId(organizationId));
  const currentUserId = storedUserId?.trim() || currentUser?.id?.trim();
  const isOrganizationOwner = Boolean(
    currentUserId &&
      organization?.ownerId &&
      currentUserId === organization.ownerId,
  );
  const { data: canEditOrganization = false, isLoading: isEditAccessLoading } =
    useQuery({
      ...organizationQuery.editAccess(organizationId),
      enabled:
        Boolean(organizationId) && Boolean(organization) && !isOrganizationOwner,
      retry: false,
    });

  useEffect(() => {
    if (!organization || isOrganizationOwner || isEditAccessLoading) return;
    if (canEditOrganization) return;

    void navigate({
      to: "/organizations/$id",
      params: { id: organizationId },
      replace: true,
    });
  }, [
    canEditOrganization,
    isEditAccessLoading,
    isOrganizationOwner,
    navigate,
    organization,
    organizationId,
  ]);

  return {
    organization,
    isError,
    isPending,
    isOrganizationOwner,
    isEditAccessLoading,
    canEditOrganization,
  };
};

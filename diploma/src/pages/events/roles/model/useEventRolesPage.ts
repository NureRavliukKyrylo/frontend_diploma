import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { eventQuery } from "@entities/event";
import type {
  ContextRoleCreateDto,
  OrganizationContextRole,
} from "@entities/organization";
import { contextRoleQuery } from "@entities/organization";
import { getRoleErrorStatus } from "@pages/organizations/roles/lib/roleErrorHandlers";
import { buildRoleActionCopy } from "@pages/organizations/roles/lib/rolePayloadBuilders";
import { buildRoleMembers } from "@pages/organizations/roles/lib/roleViewModels";
import type {
  RoleActionState,
  RoleFormState,
  RoleSortOption,
  RolesTab,
  SelectedRoleState,
} from "@pages/organizations/roles/model/types";
import { canManageEventRoles } from "@widgets/events/details/lib/eventPermissions";
import { useEventPermissionContext } from "@widgets/events";
import {
  getRoleStripeColor,
  type ContextRoleCardType,
} from "@widgets/organizations/roles";
import { useEventRoleMutations } from "./useEventRoleMutations";
import { useEventRolesData } from "./useEventRolesData";
import { useTranslation } from "react-i18next";

export const useEventRolesPage = () => {
  const { t, i18n } = useTranslation("roles");
  const { id: eventId } = useParams({
    from: "/_masterLayout/events/$id/roles/",
  });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RolesTab>("active");
  const [roleSort, setRoleSort] = useState<RoleSortOption>("name");
  const [selectedRole, setSelectedRole] = useState<SelectedRoleState | null>(
    null,
  );
  const [formState, setFormState] = useState<RoleFormState | null>(null);
  const [pendingAction, setPendingAction] = useState<RoleActionState | null>(
    null,
  );
  const eventResult = useQuery(eventQuery.id(eventId));
  const permissionContext = useEventPermissionContext(eventResult.data);
  const hasKnownAccess = canManageEventRoles(
    eventResult.data,
    permissionContext,
  );
  const isBaseAccessLoading =
    eventResult.isPending || permissionContext.isLoading === true;
  const rolesAccessResult = useQuery({
    ...contextRoleQuery.entity("event", eventId),
    enabled: Boolean(eventResult.data) && !isBaseAccessLoading,
    retry: false,
  });
  const canEdit = hasKnownAccess || rolesAccessResult.isSuccess;
  const isEditAccessLoading =
    isBaseAccessLoading || (!hasKnownAccess && rolesAccessResult.isPending);
  const canLoad = Boolean(
    eventResult.data && !isEditAccessLoading && canEdit,
  );
  const rolesData = useEventRolesData(eventId, canLoad);
  const mutations = useEventRoleMutations({
    eventId,
    setFormState,
    setPendingAction,
    setSelectedRole,
  });

  useEffect(() => {
    if (!rolesData.event || isEditAccessLoading || canEdit) return;
    void navigate({
      to: "/events/$id",
      params: { id: eventId },
      replace: true,
    });
  }, [
    canEdit,
    eventId,
    isEditAccessLoading,
    navigate,
    rolesData.event,
  ]);

  useEffect(() => {
    if (
      rolesData.activeRolesResult.isError &&
      getRoleErrorStatus(rolesData.activeRolesResult.error) === 403
    ) {
      void navigate({
        to: "/events/$id",
        params: { id: eventId },
        replace: true,
      });
    }
  }, [eventId, navigate, rolesData.activeRolesResult]);

  const getMembersForRole = useCallback(
    (roleId: string) => rolesData.membersByRoleId.get(roleId) ?? [],
    [rolesData.membersByRoleId],
  );
  const getMemberCountForRole = useCallback(
    (roleId: string) => getMembersForRole(roleId).length,
    [getMembersForRole],
  );
  const selectedMembers = useMemo(
    () =>
      selectedRole
        ? buildRoleMembers(
            getMembersForRole(selectedRole.role.id),
            rolesData.profilesByUserId,
            t,
            i18n.language,
          )
        : [],
    [
      getMembersForRole,
      i18n.language,
      rolesData.profilesByUserId,
      selectedRole,
      t,
    ],
  );
  const openRoleCard = (
    role: OrganizationContextRole,
    type: ContextRoleCardType,
    index: number,
  ) => setSelectedRole({ role, type, index });
  const openAction = (
    role: OrganizationContextRole,
    type: ContextRoleCardType,
    action: RoleActionState["action"],
  ) => setPendingAction({ role, type, action });
  const submitRole = async (payload: ContextRoleCreateDto) => {
    if (!formState) return;
    await mutations.saveMutation.mutateAsync({
      role: formState.role,
      payload,
      mode: formState.mode,
    });
  };
  const organizationId = rolesData.event?.organizationId?.trim() ?? "";

  return {
    organizationId,
    entityType: "event" as const,
    entityId: eventId,
    contextName: rolesData.event?.title,
    eventId,
    navigate,
    canEdit,
    isEditAccessLoading,
    activeTab,
    setActiveTab,
    roleSort,
    setRoleSort,
    selectedRole,
    setSelectedRole,
    formState,
    setFormState,
    pendingAction,
    setPendingAction,
    actionCopy: buildRoleActionCopy(pendingAction, t),
    selectedMembers,
    selectedMemberCount: selectedRole
      ? getMemberCountForRole(selectedRole.role.id)
      : 0,
    selectedStripeColor: getRoleStripeColor(selectedRole?.index ?? 0),
    getMemberCountForRole,
    openRoleCard,
    openAction,
    submitRole,
    ...rolesData,
    ...mutations,
  };
};

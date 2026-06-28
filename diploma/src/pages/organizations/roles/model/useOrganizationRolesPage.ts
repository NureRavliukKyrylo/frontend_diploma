import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import type {
  ContextRoleCreateDto,
  OrganizationContextRole,
} from "@entities/organization";
import {
  getRoleStripeColor,
  type ContextRoleCardType,
} from "@widgets/organizations/roles";
import { getRoleErrorStatus } from "../lib/roleErrorHandlers";
import { buildRoleActionCopy } from "../lib/rolePayloadBuilders";
import { buildRoleMembers } from "../lib/roleViewModels";
import { useOrganizationRoleMutations } from "./useOrganizationRoleMutations";
import { useOrganizationRolesData } from "./useOrganizationRolesData";
import type {
  RoleActionState,
  RoleFormState,
  RoleSortOption,
  RolesTab,
  SelectedRoleState,
} from "./types";

export const useOrganizationRolesPage = () => {
  const { id: organizationId } = useParams({
    from: "/_masterLayout/organizations/$id/roles/",
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
  const rolesData = useOrganizationRolesData(organizationId);
  const mutations = useOrganizationRoleMutations({
    organizationId,
    setFormState,
    setPendingAction,
    setSelectedRole,
  });

  useEffect(() => {
    if (
      rolesData.activeRolesResult.isError &&
      getRoleErrorStatus(rolesData.activeRolesResult.error) === 403
    ) {
      void navigate({
        to: "/organizations/$id",
        params: { id: organizationId },
        replace: true,
      });
    }
  }, [navigate, organizationId, rolesData.activeRolesResult]);

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
          )
        : [],
    [getMembersForRole, rolesData.profilesByUserId, selectedRole],
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

  return {
    organizationId,
    navigate,
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
    actionCopy: buildRoleActionCopy(pendingAction),
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

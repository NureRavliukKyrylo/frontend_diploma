import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import type {
  ContextRoleCreateDto,
  OrganizationContextRole,
} from "@entities/organization";
import { projectQuery } from "@entities/project";
import {
  getRoleStripeColor,
  type ContextRoleCardType,
} from "@widgets/organizations/roles";
import { canManageProjectRoles } from "@widgets/projects/details/lib/projectPermissions";
import { useProjectPermissionContext } from "@widgets/projects";
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
import { useProjectRoleMutations } from "./useProjectRoleMutations";
import { useProjectRolesData } from "./useProjectRolesData";
import { useTranslation } from "react-i18next";

export const useProjectRolesPage = () => {
  const { t, i18n } = useTranslation("roles");
  const { id: projectId } = useParams({
    from: "/_masterLayout/projects/$id/roles/",
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
  const projectResult = useQuery(projectQuery.id(projectId));
  const permissionContext = useProjectPermissionContext(projectResult.data);
  const canEdit = canManageProjectRoles(
    projectResult.data,
    permissionContext,
  );
  const isEditAccessLoading =
    projectResult.isPending || permissionContext.isLoading === true;
  const canLoad = Boolean(
    projectResult.data && !isEditAccessLoading && canEdit,
  );
  const rolesData = useProjectRolesData(projectId, canLoad);
  const mutations = useProjectRoleMutations({
    projectId,
    setFormState,
    setPendingAction,
    setSelectedRole,
  });

  useEffect(() => {
    if (
      !rolesData.project ||
      isEditAccessLoading ||
      canEdit
    ) {
      return;
    }
    void navigate({
      to: "/projects/$id",
      params: { id: projectId },
      replace: true,
    });
  }, [
    canEdit,
    isEditAccessLoading,
    navigate,
    projectId,
    rolesData.project,
  ]);

  useEffect(() => {
    if (
      rolesData.activeRolesResult.isError &&
      getRoleErrorStatus(rolesData.activeRolesResult.error) === 403
    ) {
      void navigate({
        to: "/projects/$id",
        params: { id: projectId },
        replace: true,
      });
    }
  }, [navigate, projectId, rolesData.activeRolesResult]);

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
  const organizationId = rolesData.project?.organizationId?.trim() ?? "";

  return {
    organizationId,
    entityType: "project" as const,
    entityId: projectId,
    contextName: rolesData.project?.title,
    projectId,
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

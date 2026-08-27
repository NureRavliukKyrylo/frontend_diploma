import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  archiveContextRole,
  contextRoleKeys,
  createContextRole,
  createContextRoleFromTemplate,
  deleteContextRole,
  restoreContextRole,
  updateContextRole,
  type OrganizationContextRole,
} from "@entities/organization";
import { getRoleSaveErrorMessage } from "@pages/organizations/roles/lib/roleErrorHandlers";
import { buildRolePayload } from "@pages/organizations/roles/lib/rolePayloadBuilders";
import type {
  RoleActionState,
  RoleFormState,
  SaveRoleVariables,
  SelectedRoleState,
} from "@pages/organizations/roles/model/types";
import { useTranslation } from "react-i18next";

interface Params {
  projectId: string;
  setFormState: Dispatch<SetStateAction<RoleFormState | null>>;
  setPendingAction: Dispatch<SetStateAction<RoleActionState | null>>;
  setSelectedRole: Dispatch<SetStateAction<SelectedRoleState | null>>;
}

export const useProjectRoleMutations = ({
  projectId,
  setFormState,
  setPendingAction,
  setSelectedRole,
}: Params) => {
  const { t } = useTranslation("roles");
  const queryClient = useQueryClient();
  const invalidate = () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: contextRoleKeys.entity("project", projectId, false),
      }),
      queryClient.invalidateQueries({
        queryKey: contextRoleKeys.entity("project", projectId, true),
      }),
      queryClient.invalidateQueries({
        queryKey: contextRoleKeys.templates("project"),
      }),
    ]);
  const saveMutation = useMutation({
    mutationFn: ({ role, payload, mode }: SaveRoleVariables) =>
      mode === "edit" && role
        ? updateContextRole(role.id, payload)
        : mode === "template" && role
          ? createContextRoleFromTemplate({
              templateId: role.id,
              entityType: "project",
              entityId: projectId,
              name: payload.name,
              description: payload.description,
              isDefaultForJoin: payload.isDefaultForJoin,
              permissionsOverride: payload.permissions,
            })
          : createContextRole({
              ...payload,
              entityType: "project",
              entityId: projectId,
            }),
    onSuccess: async () => {
      await invalidate();
      addToast({ title: t("toast.saved"), color: "success" });
      setFormState(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: t("toast.saveFailed"),
        description: getRoleSaveErrorMessage(error, t),
        color: "danger",
      }),
  });
  const toggleDefaultMutation = useMutation({
    mutationFn: (role: OrganizationContextRole) =>
      updateContextRole(
        role.id,
        buildRolePayload(role, {
          entityType: "project",
          entityId: projectId,
          isDefaultForJoin: !role.isDefaultForJoin,
          archivedAt: null,
          archiveReason: null,
        }),
      ),
    onSuccess: async (_, role) => {
      await invalidate();
      addToast({
        title: role.isDefaultForJoin
          ? t("toast.defaultRemoved")
          : t("toast.defaultUpdated"),
        color: "success",
      });
    },
    onError: () =>
      addToast({ title: t("toast.defaultFailed"), color: "danger" }),
  });
  const actionMutation = useMutation({
    mutationFn: (state: RoleActionState) => {
      if (state.action === "archive") {
        return archiveContextRole(state.role.id, "manual");
      }
      if (state.action === "restore") return restoreContextRole(state.role.id);
      return deleteContextRole(state.role.id);
    },
    onSuccess: async (_, state) => {
      await invalidate();
      addToast({
        title:
          state.action === "archive"
            ? t("toast.archived")
            : state.action === "restore"
              ? t("toast.restored")
              : t("toast.deleted"),
        color: "success",
      });
      setPendingAction(null);
      setSelectedRole((current) =>
        current &&
        current.role.id === state.role.id &&
        state.action === "delete"
          ? null
          : current,
      );
    },
    onError: () =>
      addToast({ title: t("toast.actionFailed"), color: "danger" }),
  });

  return { saveMutation, toggleDefaultMutation, actionMutation };
};

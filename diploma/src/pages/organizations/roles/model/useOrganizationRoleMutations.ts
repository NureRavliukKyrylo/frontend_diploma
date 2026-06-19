import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  archiveContextRole,
  createContextRole,
  deleteContextRole,
  organizationKeys,
  restoreContextRole,
  updateContextRole,
  type OrganizationContextRole,
} from "@entities/organization";
import { getRoleSaveErrorMessage } from "../lib/roleErrorHandlers";
import { buildRolePayload } from "../lib/rolePayloadBuilders";
import type {
  RoleActionState,
  RoleFormState,
  SaveRoleVariables,
  SelectedRoleState,
} from "./types";

interface Params {
  organizationId: string;
  setFormState: Dispatch<SetStateAction<RoleFormState | null>>;
  setPendingAction: Dispatch<SetStateAction<RoleActionState | null>>;
  setSelectedRole: Dispatch<SetStateAction<SelectedRoleState | null>>;
}

export const useOrganizationRoleMutations = ({
  organizationId,
  setFormState,
  setPendingAction,
  setSelectedRole,
}: Params) => {
  const queryClient = useQueryClient();
  const invalidate = () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: [...organizationKeys.all(), "context-roles", organizationId],
      }),
      queryClient.invalidateQueries({
        queryKey: organizationKeys.contextRoleTemplates("organization"),
      }),
    ]);
  const saveMutation = useMutation({
    mutationFn: ({ role, payload, mode }: SaveRoleVariables) =>
      mode === "edit" && role
        ? updateContextRole(role.id, payload)
        : createContextRole(payload),
    onSuccess: async () => {
      await invalidate();
      addToast({ title: "Role saved", color: "success" });
      setFormState(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: "Failed to save role",
        description: getRoleSaveErrorMessage(error),
        color: "danger",
      }),
  });
  const toggleDefaultMutation = useMutation({
    mutationFn: (role: OrganizationContextRole) =>
      updateContextRole(
        role.id,
        buildRolePayload(role, {
          isDefaultForJoin: !role.isDefaultForJoin,
          archivedAt: null,
          archiveReason: null,
        }),
      ),
    onSuccess: async (_, role) => {
      await invalidate();
      addToast({
        title: role.isDefaultForJoin
          ? "Default role removed"
          : "Default role updated",
        color: "success",
      });
    },
    onError: () =>
      addToast({ title: "Failed to update default role", color: "danger" }),
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
            ? "Role archived"
            : state.action === "restore"
              ? "Role restored"
              : "Role deleted",
        color: "success",
      });
      setPendingAction(null);
      setSelectedRole((current) =>
        current && current.role.id === state.role.id && state.action === "delete"
          ? null
          : current,
      );
    },
    onError: () =>
      addToast({ title: "Role action failed", color: "danger" }),
  });

  return { saveMutation, toggleDefaultMutation, actionMutation };
};

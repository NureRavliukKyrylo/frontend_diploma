import { useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  archiveContextRole,
  createContextRole,
  createContextRoleFromTemplate,
  deleteContextRole,
  getContextRolesForEntity,
  getContextRoleTemplates,
  restoreContextRole,
  setDefaultContextRole,
  updateContextRole,
  type ContextRoleCreateDto,
  type ContextRoleDto,
} from "@entities/organization";
import { participationQuery } from "@entities/participation";
import type { EntityType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs/error-message";
import { ConfirmationModal } from "@shared/ui/modals";
import { RoleCard, RoleFormModal } from "@widgets/organizations/roles";
import styles from "./EntityRolesManager.module.scss";

interface EntityRolesManagerLabels {
  loading: string;
  error: string;
  empty: string;
  createRole: string;
  templates: string;
  saved: string;
  failed: string;
  confirmDeleteTitle: string;
  confirmDeleteText: string;
  confirmDelete: string;
  cancel: string;
}

interface EntityRolesManagerProps {
  entityType: EntityType;
  entityId: string;
  entityName?: string;
  labels: EntityRolesManagerLabels;
  stateClassName: string;
}

type ModalState =
  | { mode: "create"; role: null }
  | { mode: "edit"; role: ContextRoleDto }
  | { mode: "template"; role: ContextRoleDto }
  | null;

export const EntityRolesManager = ({
  entityType,
  entityId,
  entityName,
  labels,
  stateClassName,
}: EntityRolesManagerProps) => {
  const queryClient = useQueryClient();
  const [modalState, setModalState] = useState<ModalState>(null);
  const [roleToDelete, setRoleToDelete] = useState<ContextRoleDto | null>(null);
  const rolesQueryKey = ["context-roles", entityType, entityId];
  const rolesResult = useQuery({
    queryKey: rolesQueryKey,
    queryFn: () => getContextRolesForEntity(entityType, entityId),
  });
  const templatesResult = useQuery({
    queryKey: ["context-role-templates", entityType],
    queryFn: () => getContextRoleTemplates(entityType),
  });
  const membersResult = useQuery(
    participationQuery.members({
      entityType,
      entityId,
      page: 1,
      pageSize: 100,
    }),
  );
  const roles = rolesResult.data ?? [];
  const templates = templatesResult.data ?? [];
  const members = membersResult.data?.data ?? [];
  const invalidateRoles = () =>
    queryClient.invalidateQueries({ queryKey: rolesQueryKey });
  const saveMutation = useMutation({
    mutationFn: async (payload: ContextRoleCreateDto) => {
      if (modalState?.mode === "edit" && modalState.role) {
        return updateContextRole(modalState.role.id, payload);
      }

      if (modalState?.mode === "template" && modalState.role) {
        return createContextRoleFromTemplate({
          templateId: modalState.role.id,
          entityType,
          entityId,
          name: payload.name,
          description: payload.description,
          isDefaultForJoin: payload.isDefaultForJoin,
          permissionsOverride: payload.permissions,
        });
      }

      return createContextRole(payload);
    },
    onSuccess: async () => {
      await invalidateRoles();
      addToast({ title: labels.saved, color: "success" });
      setModalState(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });
  const roleActionMutation = useMutation({
    mutationFn: ({
      action,
      role,
    }: {
      action: "archive" | "restore" | "default";
      role: ContextRoleDto;
    }) => {
      if (action === "archive") return archiveContextRole(role.id, "manual");
      if (action === "restore") return restoreContextRole(role.id);
      return setDefaultContextRole(role.id, {
        name: role.name,
        description: role.description ?? null,
        isTemplate: role.isTemplate,
        templateSourceId: role.templateSourceId ?? null,
        isSystemGenerated: role.isSystemGenerated,
        entityType: role.entityType,
        entityId: role.entityId,
        permissions: role.permissions,
        assignableBy: role.assignableBy,
        approvableBy: role.approvableBy,
        isActive: true,
      });
    },
    onSuccess: async () => {
      await invalidateRoles();
      addToast({ title: labels.saved, color: "success" });
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });
  const deleteMutation = useMutation({
    mutationFn: (role: ContextRoleDto) => deleteContextRole(role.id),
    onSuccess: async () => {
      await invalidateRoles();
      addToast({ title: labels.saved, color: "success" });
      setRoleToDelete(null);
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });

  if (rolesResult.isPending || templatesResult.isPending) {
    return <div className={stateClassName}>{labels.loading}</div>;
  }

  if (rolesResult.isError || templatesResult.isError) {
    return <div className={stateClassName}>{labels.error}</div>;
  }

  return (
    <div className={styles.rolesManager}>
      <div className={styles.rolesToolbar}>
        <button
          type="button"
          className={styles.createButton}
          onClick={() => setModalState({ mode: "create", role: null })}
        >
          {labels.createRole}
        </button>
      </div>

      {roles.length === 0 ? (
        <div className={stateClassName}>{labels.empty}</div>
      ) : (
        <div className={styles.rolesGrid}>
          {roles.map((role, index) => (
            <RoleCard
              key={role.id}
              role={role}
              index={index}
              type={role.isSystemGenerated ? "system" : "custom"}
              archived={Boolean(role.archivedAt)}
              onClick={() => setModalState({ mode: "edit", role })}
              onEdit={() => setModalState({ mode: "edit", role })}
              onArchive={() =>
                roleActionMutation.mutate({ action: "archive", role })
              }
              onRestore={() =>
                roleActionMutation.mutate({ action: "restore", role })
              }
              onSetDefault={() =>
                roleActionMutation.mutate({ action: "default", role })
              }
              onDelete={() => setRoleToDelete(role)}
            />
          ))}
        </div>
      )}

      {templates.length > 0 ? (
        <>
          <div className={styles.sectionLabel}>{labels.templates}</div>
          <div className={styles.rolesGrid}>
            {templates.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                index={index}
                type="template"
                onClick={() => setModalState({ mode: "template", role })}
                onUse={() => setModalState({ mode: "template", role })}
              />
            ))}
          </div>
        </>
      ) : null}

      <RoleFormModal
        isOpen={Boolean(modalState)}
        mode={modalState?.mode ?? "create"}
        organizationId={entityId}
        entityType={entityType}
        entityId={entityId}
        organizationName={entityName}
        role={modalState?.role ?? null}
        members={members}
        roles={roles}
        existingRoles={roles}
        isSubmitting={saveMutation.isPending}
        onClose={() => setModalState(null)}
        onSubmit={async (payload) => {
          await saveMutation.mutateAsync(payload);
        }}
      />

      <ConfirmationModal
        isOpen={Boolean(roleToDelete)}
        title={labels.confirmDeleteTitle}
        text={labels.confirmDeleteText}
        confirmText={labels.confirmDelete}
        cancelText={labels.cancel}
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (roleToDelete) deleteMutation.mutate(roleToDelete);
        }}
        onCancel={() => setRoleToDelete(null)}
      />
    </div>
  );
};

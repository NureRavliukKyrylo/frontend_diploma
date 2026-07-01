import { ConfirmationModal } from "@shared/ui/modals";
import { RoleDrawer, RoleFormModal } from "@widgets/organizations/roles";
import type { OrganizationRolesPageModel } from "../../model/pageModel";
import { useTranslation } from "react-i18next";

interface RolesOverlaysProps {
  model: OrganizationRolesPageModel;
}

export const RolesOverlays = ({ model }: RolesOverlaysProps) => {
  const { t } = useTranslation("roles");

  return (
    <>
      <RoleDrawer
        isOpen={Boolean(model.selectedRole)}
        role={model.selectedRole?.role ?? null}
        type={model.selectedRole?.type ?? null}
        stripeColor={model.selectedStripeColor}
        memberCount={model.selectedMemberCount}
        members={model.selectedMembers}
        assignmentMembers={model.members}
        assignmentRoles={model.activeScopedRoles}
        onClose={() => model.setSelectedRole(null)}
        onEdit={
          model.selectedRole?.type === "custom" &&
          !model.selectedRole.role.archivedAt
            ? () =>
                model.setFormState({
                  mode: "edit",
                  role: model.selectedRole!.role,
                })
            : undefined
        }
        onSetDefault={
          model.selectedRole?.type === "custom" &&
          !model.selectedRole.role.archivedAt
            ? () => model.toggleDefaultMutation.mutate(model.selectedRole!.role)
            : undefined
        }
        onArchive={
          model.selectedRole?.type === "custom" &&
          !model.selectedRole.role.archivedAt
            ? () =>
                model.openAction(
                  model.selectedRole!.role,
                  model.selectedRole!.type,
                  "archive",
                )
            : undefined
        }
        onDelete={
          model.selectedRole?.type === "custom"
            ? () =>
                model.openAction(
                  model.selectedRole!.role,
                  model.selectedRole!.type,
                  "delete",
                )
            : undefined
        }
      />

      <RoleFormModal
        isOpen={Boolean(model.formState)}
        mode={model.formState?.mode ?? "create"}
        role={model.formState?.role ?? null}
        organizationId={model.organizationId}
        entityType={model.entityType}
        entityId={model.entityId}
        organizationName={model.contextName}
        members={model.members}
        roles={model.activeScopedRoles}
        existingRoles={model.allScopedRoles}
        isSubmitting={model.saveMutation.isPending}
        onClose={() => model.setFormState(null)}
        onSubmit={model.submitRole}
      />

      <ConfirmationModal
        isOpen={Boolean(model.pendingAction)}
        title={model.actionCopy.title}
        text={model.actionCopy.text}
        confirmText={model.actionCopy.confirmText}
        cancelText={t("confirmation.cancel")}
        isLoading={model.actionMutation.isPending}
        onCancel={() => model.setPendingAction(null)}
        onConfirm={() => {
          if (model.pendingAction) {
            void model.actionMutation.mutateAsync(model.pendingAction);
          }
        }}
      />
    </>
  );
};

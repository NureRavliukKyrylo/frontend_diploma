import { ArrowLeft, ArrowRight, Check, MapPin, X } from "lucide-react";
import type {
  ContextRoleCreateDto,
  ContextRoleDto,
} from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import { Toggle } from "@shared/ui";
import { BaseModal } from "@shared/ui/modals/base-modal/BaseModal";
import { RoleAssigneePicker } from "../RoleAssigneePicker";
import { RolePermissionGroups } from "./RolePermissionGroups";
import { type RoleFormMode, useRoleFormModal } from "./model/useRoleFormModal";
import styles from "./RoleFormModal.module.scss";

interface RoleFormModalProps {
  isOpen: boolean;
  mode: RoleFormMode;
  organizationId: string;
  entityType?: string;
  entityId?: string;
  organizationName?: string;
  role?: ContextRoleDto | null;
  members: ParticipationListItem[];
  roles: ContextRoleDto[];
  existingRoles: ContextRoleDto[];
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: ContextRoleCreateDto) => Promise<void>;
}

const toggleTabs = [
  { label: "No", value: "off" },
  { label: "Yes", value: "on" },
];

const steps = ["Basics", "Permissions", "Assignment"];

const getEntityLabel = (entityType?: string | null) => {
  if (entityType === "project") return "Project";
  if (entityType === "event") return "Event";
  if (entityType === "task") return "Task";
  return "Organization";
};

export const RoleFormModal = ({
  isOpen,
  mode,
  organizationId,
  entityType = "organization",
  entityId = organizationId,
  organizationName,
  role,
  members,
  roles,
  existingRoles,
  isSubmitting = false,
  onClose,
  onSubmit,
}: RoleFormModalProps) => {
  const form = useRoleFormModal({
    isOpen,
    mode,
    organizationId,
    entityType,
    entityId,
    role,
    existingRoles,
    onSubmit,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modalWrapper}
      maxWidth="640px"
      showClosed={false}
      animation="default"
    >
      <div className={styles.modal}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <h2>{form.title}</h2>
            <p>{form.stepSubtitle}</p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="Close role form"
            onClick={onClose}
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </header>

        <div className={styles.stepperWrap}>
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCurrent = form.currentStep === stepNumber;
            const isDone = form.currentStep > stepNumber;

            return (
              <div key={step} className={styles.stepCluster}>
                <div
                  className={`${styles.stepItem} ${
                    isDone
                      ? styles.stepDone
                      : isCurrent
                        ? styles.stepCurrent
                        : styles.stepUpcoming
                  }`}
                >
                  <span className={styles.stepCircle}>
                    {isDone ? <Check size={14} strokeWidth={3} /> : stepNumber}
                  </span>
                  <span className={styles.stepLabel}>{step}</span>
                </div>
                {index < steps.length - 1 ? (
                  <span className={styles.stepLine} />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={styles.form}>
          {form.currentStep === 1 ? (
            <>
              <div className={styles.field}>
                <label htmlFor="role-name">Name</label>
                <input
                  id="role-name"
                  value={form.values.name}
                  maxLength={200}
                  placeholder="e.g. Event Coordinator"
                  onChange={(event) =>
                    form.updateField("name", event.target.value)
                  }
                />
                {form.errors.name ? (
                  <span className={styles.error}>{form.errors.name}</span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="role-description">Description</label>
                <textarea
                  id="role-description"
                  value={form.values.description}
                  placeholder="Describe what this role can do..."
                  onChange={(event) =>
                    form.updateField("description", event.target.value)
                  }
                />
              </div>

              {mode === "edit" && role ? (
                <div className={styles.contextLine}>
                  <MapPin size={15} strokeWidth={2.4} />
                  <span>
                    Applies to:{" "}
                    <strong>
                      {getEntityLabel(role.entityType)} —{" "}
                      {role.entityType === "organization"
                        ? (organizationName ?? "Current organization")
                        : (role.entityId ?? "Current context")}
                    </strong>
                  </span>
                </div>
              ) : null}
            </>
          ) : null}

          {form.currentStep === 2 ? (
            <RolePermissionGroups
              groups={form.permissionGroups}
              selectedCountLabel={form.selectedCountLabel}
              error={form.errors.permissions}
              onToggle={form.togglePermission}
            />
          ) : null}

          {form.currentStep === 3 ? (
            <div className={styles.assignmentStep}>
              <p className={styles.assignmentHint}>
                Pick specific people or other roles. Leave empty to allow anyone
                with role-management permission.
              </p>
              <RoleAssigneePicker
                label="Assignable by"
                values={form.values.assignableBy}
                members={members}
                roles={roles}
                currentRoleId={role?.id}
                onAdd={(value) => form.addAssignment("assignableBy", value)}
                onRemove={(value) =>
                  form.removeAssignment("assignableBy", value)
                }
              />
              <RoleAssigneePicker
                label="Approvable by"
                values={form.values.approvableBy}
                members={members}
                roles={roles}
                currentRoleId={role?.id}
                onAdd={(value) => form.addAssignment("approvableBy", value)}
                onRemove={(value) =>
                  form.removeAssignment("approvableBy", value)
                }
              />

              <section className={styles.defaultBlock}>
                <div className={styles.defaultCopy}>
                  <h3>Default for new members</h3>
                  <p>Assign this role automatically when a member joins.</p>
                </div>
                <Toggle
                  tabs={toggleTabs}
                  activeValue={form.values.isDefaultForJoin ? "on" : "off"}
                  onChange={(value) =>
                    form.updateField("isDefaultForJoin", value === "on")
                  }
                  className={styles.defaultToggle}
                  buttonClassName={styles.toggleButton}
                  activeButtonClassName={styles.toggleButtonActive}
                  pillClassName={styles.togglePill}
                />
              </section>
            </div>
          ) : null}
        </div>

        {form.currentStep === 3 && form.submitError ? (
          <div className={styles.submitErrorBanner}>{form.submitError}</div>
        ) : null}

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {form.currentStep > 1 ? (
            <button
              type="button"
              className={styles.backButton}
              onClick={form.goToPreviousStep}
              disabled={isSubmitting}
            >
              <ArrowLeft size={15} strokeWidth={2.4} />
              Back
            </button>
          ) : null}
          <button
            type="button"
            className={styles.submitButton}
            onClick={
              form.currentStep === 3 ? form.handleSubmit : form.goToNextStep
            }
            disabled={isSubmitting || !form.canContinue}
          >
            {isSubmitting
              ? "Saving..."
              : form.currentStep === 3
                ? form.submitLabel
                : "Continue"}
            {form.currentStep < 3 ? (
              <ArrowRight size={15} strokeWidth={2.4} />
            ) : null}
          </button>
        </footer>
      </div>
    </BaseModal>
  );
};

import { X } from "lucide-react";
import type {
  ContextRoleCreateDto,
  ContextRoleDto,
} from "@entities/organization";
import { Toggle } from "@shared/ui";
import { BaseModal } from "@shared/ui/modals/base-modal/BaseModal";
import { RolePermissionGroups } from "./RolePermissionGroups";
import {
  type RoleFormMode,
  useRoleFormModal,
} from "./model/useRoleFormModal";
import styles from "./RoleFormModal.module.scss";

interface RoleFormModalProps {
  isOpen: boolean;
  mode: RoleFormMode;
  organizationId: string;
  role?: ContextRoleDto | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: ContextRoleCreateDto) => Promise<void>;
}

const toggleTabs = [
  { label: "No", value: "off" },
  { label: "Yes", value: "on" },
];
export const RoleFormModal = ({
  isOpen,
  mode,
  organizationId,
  role,
  isSubmitting = false,
  onClose,
  onSubmit,
}: RoleFormModalProps) => {
  const form = useRoleFormModal({
    isOpen,
    mode,
    organizationId,
    role,
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
            <p>
              Configure what this role can do and how it is assigned to
              organization members.
            </p>
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

        <div className={styles.form}>
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

          <RolePermissionGroups
            groups={form.permissionGroups}
            selectedCountLabel={form.selectedCountLabel}
            error={form.errors.permissions}
            onToggle={form.togglePermission}
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

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.submitButton}
            onClick={form.handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : form.submitLabel}
          </button>
        </footer>
      </div>
    </BaseModal>
  );
};

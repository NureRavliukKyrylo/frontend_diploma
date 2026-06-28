import {
  adminDashboardKeys,
  changeAdminUserRole,
  type AdminUserListItem,
} from "@entities/admin";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { SortDropDown } from "@shared/ui/drop-down";
import { BaseModal, ConfirmationModal } from "@shared/ui/modals";
import { BadgeCheck, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import styles from "./AdminChangeRoleModal.module.scss";

interface AdminChangeRoleModalProps {
  user: AdminUserListItem | null;
  onClose: () => void;
}

type SystemRoleValue = "Guest" | "User" | "Moderator" | "Admin" | "SuperAdmin";

const systemRoleOptions: { value: SystemRoleValue; label: string }[] = [
  { value: "Guest", label: "Guest" },
  { value: "User", label: "User" },
  { value: "Moderator", label: "Moderator" },
  { value: "Admin", label: "Admin" },
  { value: "SuperAdmin", label: "SuperAdmin" },
];

const getUserName = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return user.displayName || fullName || user.email || "Unknown user";
};

const normalizeRole = (role?: string | null): SystemRoleValue => {
  const match = systemRoleOptions.find((option) => option.value === role);
  return match?.value ?? "User";
};

const getRoleChangeErrorMessage = (error: unknown) => {
  const status = (error as { response?: { status?: number } })?.response?.status;

  if (status === 403) {
    return "You don't have permission to assign this role";
  }

  return getErrorMessage(error);
};

export const AdminChangeRoleModal = ({
  user,
  onClose,
}: AdminChangeRoleModalProps) => {
  const queryClient = useQueryClient();
  const currentRole = useMemo(() => normalizeRole(user?.roleName), [user?.roleName]);
  const [selectedRole, setSelectedRole] = useState<SystemRoleValue>(currentRole);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error("User is not selected");
      }

      return changeAdminUserRole(user.userId, selectedRole);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminDashboardKeys.all() });
      addToast({
        title: "Role changed",
        description: `${user ? getUserName(user) : "The user"} is now ${selectedRole}.`,
        color: "success",
      });
      setIsConfirmOpen(false);
      onClose();
    },
  });

  useEffect(() => {
    setSelectedRole(currentRole);
    setIsConfirmOpen(false);
  }, [currentRole, user?.userId]);

  if (!user) {
    return null;
  }

  const displayName = getUserName(user);
  const isSameRole = selectedRole === currentRole;
  const errorMessage = mutation.isError
    ? getRoleChangeErrorMessage(mutation.error)
    : null;

  const handleCancel = () => {
    if (mutation.isPending) {
      return;
    }

    setIsConfirmOpen(false);
    mutation.reset();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSameRole) {
      setIsConfirmOpen(true);
    }
  };

  return (
    <>
      <BaseModal
        isOpen={Boolean(user)}
        onClose={handleCancel}
        maxWidth="560px"
        showClosed={false}
      >
        <form className={styles.wrapper} onSubmit={handleSubmit}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCancel}
            aria-label="Close role dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className={styles.icon}>
            <BadgeCheck size={26} aria-hidden="true" />
          </div>

          <div className={styles.header}>
            <h2 className={styles.title}>Change system role</h2>
            <p className={styles.description}>
              Update the platform-wide role for <strong>{displayName}</strong>.
            </p>
          </div>

          <div className={styles.currentRoleLine}>
            Current role: <strong>{user.roleName || currentRole}</strong>
          </div>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>New role</span>
            <div className={styles.dropdownField}>
              <SortDropDown
                selectedLabelOnly
                options={systemRoleOptions}
                value={selectedRole}
                onSelect={(value) => {
                  mutation.reset();
                  setSelectedRole(value);
                }}
              />
            </div>
          </label>

          {errorMessage && <div className={styles.error}>{errorMessage}</div>}

          <div className={styles.footer}>
            <BaseButtonWrapper
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </BaseButtonWrapper>
            <BaseButtonWrapper
              type="submit"
              className={styles.submitButton}
              disabled={isSameRole}
            >
              Change role
            </BaseButtonWrapper>
          </div>
        </form>
      </BaseModal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        title="Change system role?"
        text={`${displayName} will be changed from ${user.roleName || currentRole} to ${selectedRole}. This affects what they can do across the entire platform.`}
        onConfirm={() => mutation.mutate()}
        onCancel={() => {
          if (!mutation.isPending) {
            setIsConfirmOpen(false);
          }
        }}
        confirmText="Change role"
        cancelText="Cancel"
        isLoading={mutation.isPending}
        error={errorMessage}
        maxWidth="480px"
      />
    </>
  );
};

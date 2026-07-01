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
import { useTranslation } from "react-i18next";
import styles from "./AdminChangeRoleModal.module.scss";

interface AdminChangeRoleModalProps {
  user: AdminUserListItem | null;
  onClose: () => void;
}

type SystemRoleValue = "Guest" | "User" | "Moderator" | "Admin" | "SuperAdmin";

const systemRoleOptions: { value: SystemRoleValue; label: string }[] = [
  { value: "Guest", label: "admin:users.role.roles.Guest" },
  { value: "User", label: "admin:users.role.roles.User" },
  { value: "Moderator", label: "admin:users.role.roles.Moderator" },
  { value: "Admin", label: "admin:users.role.roles.Admin" },
  { value: "SuperAdmin", label: "admin:users.role.roles.SuperAdmin" },
];

const getUserName = (user: AdminUserListItem, fallback: string) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return user.displayName || fullName || user.email || fallback;
};

const normalizeRole = (role?: string | null): SystemRoleValue => {
  const match = systemRoleOptions.find((option) => option.value === role);
  return match?.value ?? "User";
};

const getRoleChangeErrorMessage = (
  error: unknown,
  forbiddenMessage: string,
) => {
  const status = (error as { response?: { status?: number } })?.response
    ?.status;

  if (status === 403) {
    return forbiddenMessage;
  }

  return getErrorMessage(error);
};

export const AdminChangeRoleModal = ({
  user,
  onClose,
}: AdminChangeRoleModalProps) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();
  const localizedRoleOptions = systemRoleOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));
  const currentRole = useMemo(
    () => normalizeRole(user?.roleName),
    [user?.roleName],
  );
  const [selectedRole, setSelectedRole] =
    useState<SystemRoleValue>(currentRole);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: () => {
      if (!user) {
        throw new Error(t("users.role.notSelected"));
      }

      return changeAdminUserRole(user.userId, selectedRole);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: adminDashboardKeys.all(),
      });
      addToast({
        title: t("users.role.changed"),
        description: t("users.role.success", {
          name: user
            ? getUserName(user, t("users.card.unknown"))
            : t("users.card.unknown"),
          role: t(`users.role.roles.${selectedRole}`),
        }),
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

  const displayName = getUserName(user, t("users.card.unknown"));
  const isSameRole = selectedRole === currentRole;
  const errorMessage = mutation.isError
    ? getRoleChangeErrorMessage(mutation.error, t("users.role.forbidden"))
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
            aria-label={t("users.role.close")}
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className={styles.icon}>
            <BadgeCheck size={26} aria-hidden="true" />
          </div>

          <div className={styles.header}>
            <h2 className={styles.title}>{t("users.role.title")}</h2>
            <p className={styles.description}>
              {t("users.role.description", { name: displayName })}
            </p>
          </div>

          <div className={styles.currentRoleLine}>
            {t("users.role.current")}{" "}
            <strong>
              {t(`users.role.roles.${user.roleName || currentRole}`)}
            </strong>
          </div>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>{t("users.role.new")}</span>
            <div className={styles.dropdownField}>
              <SortDropDown
                selectedLabelOnly
                options={localizedRoleOptions}
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
              {t("common.actions.cancel")}
            </BaseButtonWrapper>
            <BaseButtonWrapper
              type="submit"
              className={styles.submitButton}
              disabled={isSameRole}
            >
              {t("users.drawer.changeRole")}
            </BaseButtonWrapper>
          </div>
        </form>
      </BaseModal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        title={t("users.role.confirmTitle")}
        text={t("users.role.confirmText", {
          name: displayName,
          current: t(`users.role.roles.${user.roleName || currentRole}`),
          next: t(`users.role.roles.${selectedRole}`),
        })}
        onConfirm={() => mutation.mutate()}
        onCancel={() => {
          if (!mutation.isPending) {
            setIsConfirmOpen(false);
          }
        }}
        confirmText={t("users.drawer.changeRole")}
        cancelText={t("common.actions.cancel")}
        isLoading={mutation.isPending}
        error={errorMessage}
        maxWidth="480px"
      />
    </>
  );
};

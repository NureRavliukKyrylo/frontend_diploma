import { LogOutImage } from "@shared/assets/images/actions";
import { ConfirmationModal } from "@shared/ui/modals";
import { useTranslation } from "react-i18next";

interface LogoutConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutConfirmationModal = ({
  isOpen,
  isLoading,
  error,
  onConfirm,
  onCancel,
}: LogoutConfirmationModalProps) => {
  const { t } = useTranslation("admin");

  return (
    <ConfirmationModal
      isOpen={isOpen}
      title={t("sidebar.logoutConfirm")}
      text={t("sidebar.logoutDescription")}
      confirmText={t("sidebar.logout")}
      cancelText={t("common.actions.cancel")}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
      image={LogOutImage}
      error={error}
    />
  );
};

import { LogOutImage } from "@shared/assets/images/actions";
import { ConfirmationModal } from "@shared/ui/modals";

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
}: LogoutConfirmationModalProps) => (
  <ConfirmationModal
    isOpen={isOpen}
    title="Are you sure you want to logout?"
    text="You will be able to sign in again whenever you need."
    confirmText="Logout"
    cancelText="Cancel"
    onConfirm={onConfirm}
    onCancel={onCancel}
    isLoading={isLoading}
    image={LogOutImage}
    error={error}
  />
);

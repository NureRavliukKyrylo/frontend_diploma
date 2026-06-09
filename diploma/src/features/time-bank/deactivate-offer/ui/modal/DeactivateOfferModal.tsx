import { ConfirmationModal } from "@shared/ui/modals";
import { useDeactivateOffer } from "../../model/useDeactivateOffer";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeactivateOfferModal.module.scss";

interface DeactivateOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerId: string;
}

export const DeactivateOfferModal = ({
  isOpen,
  onClose,
  offerId,
}: DeactivateOfferModalProps) => {
  const { deactivate, isLoading, errorMessage } = useDeactivateOffer({
    offerId,
    onSuccess: onClose,
  });

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      image={DeleteModal}
      confirmButtonClassName={styles.confirmButtonDeactivate}
      imageClassName={styles.imageDelete}
      onConfirm={deactivate}
      title="Deactivate offer"
      text="Are you sure you want to deactivate this offer? It will no longer be visible to other users."
      confirmText="Deactivate"
      cancelText="Cancel"
      error={errorMessage}
      isLoading={isLoading}
    />
  );
};

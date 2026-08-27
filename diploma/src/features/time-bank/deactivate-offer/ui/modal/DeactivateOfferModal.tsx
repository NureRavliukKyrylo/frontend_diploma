import { ConfirmationModal } from "@shared/ui/modals";
import { useDeactivateOffer } from "../../model/useDeactivateOffer";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeactivateOfferModal.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["timeBank"]);
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
      title={t("timeBank:deactivateOffer.labels.title")}
      text={t("timeBank:deactivateOffer.labels.description")}
      confirmText={t("timeBank:deactivateOffer.actions.confirm")}
      cancelText={t("timeBank:deactivateOffer.actions.cancel")}
      error={errorMessage}
      isLoading={isLoading}
    />
  );
};

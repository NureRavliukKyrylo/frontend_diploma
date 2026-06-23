import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteAvailabilityModal.module.scss";
import type { AvailabilitySlot } from "@entities/user/calendar";
import { useDeleteAvailability } from "../model/useDeleteAvailability";
import { useTranslation } from "react-i18next";
import { buildDescription } from "../libs/buildDescription";

interface DeleteAvailabilityModalProps {
  slot: AvailabilitySlot;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAvailabilityModal = ({
  slot,
  isOpen,
  onClose,
}: DeleteAvailabilityModalProps) => {
  console.log(slot);
  const { t, i18n } = useTranslation(["calendar", "common"]);
  const { handleDelete, isLoading, errorMessage } =
    useDeleteAvailability(onClose);

  const description = buildDescription(slot, t, i18n.language as "en" | "uk");

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={() => handleDelete(slot.id)}
      confirmText={t("common:actions.delete")}
      title={t("calendar:deleteModal.title")}
      text={t("calendar:deleteModal.textPattern", { description })}
      cancelText={t("calendar:actions.cancel")}
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButton}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="600px"
    />
  );
};

import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { addToast } from "@heroui/react";
import styles from "./CheckOutModal.module.scss";
import { TextAreaForm } from "@shared/ui/inputs";
import { useCheckOut } from "../../model/useCheckOut";

interface CheckOutModalProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const CheckOutModal = ({
  eventId,
  isOpen,
  onClose,
  eventTitle,
}: CheckOutModalProps) => {
  const date = new Date();

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { formik, handleCheckOut, isLoading, mutation } = useCheckOut(
    eventId,
    date,
    handleClose,
  );

  const handleSubmit = () => {
    if (!navigator.geolocation) {
      addToast({ title: "Geolocation not supported", color: "danger" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleCheckOut({
          checkOutAt: new Date(),
          note: formik.values.note || undefined,
          geo: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      () => {
        addToast({
          title: "Location access is required to check in",
          color: "danger",
        });
      },
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} maxWidth="640px">
      <div className={styles.checkInModal}>
        <h2>Check Out - {eventTitle}</h2>
        <TextAreaForm
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Leave a note... (optional)"
        />
        {formik.touched.note && formik.errors.note && (
          <p className="errorInput">{formik.errors.note}</p>
        )}
        <BaseButtonWrapper loading={isLoading} onClick={handleSubmit}>
          Confirm Check Out
        </BaseButtonWrapper>
      </div>
    </BaseModal>
  );
};

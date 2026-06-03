import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { addToast } from "@heroui/react";
import { motion } from "framer-motion";
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
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="640px"
      showClosed={false}
    >
      <div className={styles.checkOutModal}>
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
        <div className={styles.actionsBlock}>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ flex: 1 }}
          >
            <BaseButtonWrapper
              className={styles.confirmButton}
              loading={isLoading}
              onClick={handleSubmit}
            >
              Confirm Check Out
            </BaseButtonWrapper>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ flex: 1 }}
          >
            <BaseButtonWrapper
              className={styles.cancelButton}
              onClick={handleClose}
            >
              Cancel
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseModal>
  );
};

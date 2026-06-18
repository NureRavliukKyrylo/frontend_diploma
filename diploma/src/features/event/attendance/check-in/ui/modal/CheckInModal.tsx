import { BaseModal } from "@shared/ui/modals";
import { useCheckIn } from "../../model/useCheckIn";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { addToast } from "@heroui/react";
import styles from "./CheckInModal.module.scss";
import { TextAreaForm } from "@shared/ui/inputs";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CheckInModalProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const CheckInModal = ({
  eventId,
  isOpen,
  onClose,
  eventTitle,
}: CheckInModalProps) => {
  const { t } = useTranslation(["event"]);
  const date = new Date();

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { formik, handleCheckIn, isLoading, mutation } = useCheckIn(
    eventId,
    date,
    handleClose,
  );

  const handleSubmit = () => {
    if (!navigator.geolocation) {
      addToast({
        title: t("event:checkIn.notifications.geoNotSupported"),
        color: "danger",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleCheckIn({
          checkInAt: new Date(),
          note: formik.values.note || undefined,
          geo: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      () => {
        addToast({
          title: t("event:checkIn.notifications.geoRequired"),
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
      <div className={styles.checkInModal}>
        <h2>{t("event:checkIn.title", { title: eventTitle })}</h2>
        <TextAreaForm
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t("event:checkIn.placeholder")}
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
              {t("event:checkIn.confirmButton")}
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
              {t("event:checkIn.cancel")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </div>
    </BaseModal>
  );
};

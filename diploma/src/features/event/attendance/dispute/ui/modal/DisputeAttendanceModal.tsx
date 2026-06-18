import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import styles from "./DisputeAttendanceModal.module.scss";
import { TextAreaForm } from "@shared/ui/inputs";
import { useDisputeAttendance } from "../../model/useDisputeAttendance";
import { useTranslation } from "react-i18next";

interface DisputeModalProps {
  eventId: string;
  attendanceId: string;
  eventTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DisputeAttendanceModal = ({
  eventId,
  attendanceId,
  eventTitle,
  isOpen,
  onClose,
}: DisputeModalProps) => {
  const { t } = useTranslation(["event"]);
  const date = new Date();

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { formik, isLoading, mutation } = useDisputeAttendance(
    eventId,
    attendanceId,
    date,
    handleClose,
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="640px"
      showClosed={false}
    >
      <form
        onSubmit={formik.handleSubmit}
        className={styles.disputeAttendanceModal}
      >
        <h2>{t("event:dispute.title", { title: eventTitle })}</h2>
        <TextAreaForm
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t("event:dispute.placeholder")}
        />
        {formik.touched.comment && formik.errors.comment && (
          <p className="errorInput">{formik.errors.comment}</p>
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
              type="submit"
            >
              {t("event:dispute.confirmButton")}
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
              {t("event:dispute.cancel")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </form>
    </BaseModal>
  );
};

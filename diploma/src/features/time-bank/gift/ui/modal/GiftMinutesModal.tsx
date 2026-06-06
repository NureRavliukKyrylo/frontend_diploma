import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import { GiftIcon } from "@shared/assets/icons/actions";
import styles from "./GiftMinutesModal.module.scss";
import { useSendGiftMinutes } from "../../model/useSendGiftMinutes";

interface GiftMinutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientUserId: string;
}

export const GiftMinutesModal = ({
  isOpen,
  onClose,
  recipientUserId,
}: GiftMinutesModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  const { formik, isLoading } = useSendGiftMinutes({
    recipientUserId,
    onSuccess: handleClose,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="520px"
      showClosed={false}
    >
      <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Gift minutes</h1>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.label}>Amount</span>
            <div className={styles.minutesInputWrapper}>
              <input
                className={styles.minutesInput}
                name="amountMinutes"
                type="number"
                min={1}
                placeholder="minutes"
                value={formik.values.amountMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className={styles.minutesSuffix}>m</span>
            </div>
            {formik.touched.amountMinutes && formik.errors.amountMinutes && (
              <div className="errorInput">{formik.errors.amountMinutes}</div>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Message</span>
            <TextAreaForm
              name="message"
              placeholder="Add a personal note..."
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={70}
              rows={3}
            />
            {formik.touched.message && formik.errors.message && (
              <div className="errorInput">{formik.errors.message}</div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
          >
            <GiftIcon />
            Send gift
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

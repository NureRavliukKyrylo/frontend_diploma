import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import { GiftIcon } from "@shared/assets/icons/actions";
import styles from "./GiftMinutesModal.module.scss";
import { useSendGiftMinutes } from "../../model/useSendGiftMinutes";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["timeBank"]);

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
          <h1 className={styles.title}>
            {t("timeBank:gifts.labels.giftMinutes")}
          </h1>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.label}>
              {t("timeBank:gifts.labels.amount")}
            </span>
            <div className={styles.minutesInputWrapper}>
              <input
                className={styles.minutesInput}
                name="amountMinutes"
                type="number"
                min={1}
                placeholder={t("timeBank:gifts.labels.minutesPlaceholder")}
                value={formik.values.amountMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className={styles.minutesSuffix}>
                {t("timeBank:units.m")}
              </span>
            </div>
            {formik.touched.amountMinutes && formik.errors.amountMinutes && (
              <div className="errorInput">{formik.errors.amountMinutes}</div>
            )}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>
              {t("timeBank:gifts.labels.message")}
            </span>
            <TextAreaForm
              name="message"
              placeholder={t("timeBank:gifts.labels.messagePlaceholder")}
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
            type="button"
          >
            {t("timeBank:gifts.actions.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            <GiftIcon />
            {t("timeBank:gifts.actions.sendGift")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

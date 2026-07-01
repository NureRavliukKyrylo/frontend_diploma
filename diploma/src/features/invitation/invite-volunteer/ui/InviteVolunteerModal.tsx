import { useTranslation } from "react-i18next";
import { ConfirmationModal } from "@shared/ui/modals/confirmation-modal/ConfirmationModal";
import { TextArea } from "@shared/ui/inputs";
import styles from "./InviteVolunteerModal.module.scss";

interface InviteVolunteerModalProps {
  isOpen: boolean;
  volunteerName: string;
  entityName: string;
  entityLabel?: string;
  message: string;
  onMessageChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
}

export const InviteVolunteerModal = ({
  isOpen,
  volunteerName,
  entityName,
  entityLabel = "organization",
  message,
  onMessageChange,
  onConfirm,
  onCancel,
  isLoading,
  error,
}: InviteVolunteerModalProps) => {
  const { t } = useTranslation("common");
  const resolvedEntityLabel =
    entityLabel || t("inviteModal.entityFallback");

  return (
    <ConfirmationModal
    isOpen={isOpen}
    title={t("inviteModal.title", { name: volunteerName })}
    text={t("inviteModal.text", { entity: entityName })}
    onConfirm={onConfirm}
    onCancel={onCancel}
    confirmText={t("inviteModal.send")}
    cancelText={t("inviteModal.cancel")}
    isLoading={isLoading}
    error={error}
    maxWidth="620px"
  >
    <div className={styles.messageField}>
      <div className={styles.messageHeader}>
        <label htmlFor="entity-invitation-message">
          {t("inviteModal.message")}
        </label>
        <span className={styles.messageMeta}>
          {t("inviteModal.optional")}{" "}
          <span aria-hidden="true">&middot;</span> {message.length}/1000
        </span>
      </div>
      <TextArea
        id="entity-invitation-message"
        value={message}
        maxLength={1000}
        minHeight={156}
        placeHolder={t("inviteModal.placeholder", {
          entityLabel: resolvedEntityLabel,
        })}
        textareaClassName={styles.messageTextarea}
        charCountClassName={styles.internalCounter}
        onChange={(event) => onMessageChange(event.target.value)}
      />
    </div>
    </ConfirmationModal>
  );
};

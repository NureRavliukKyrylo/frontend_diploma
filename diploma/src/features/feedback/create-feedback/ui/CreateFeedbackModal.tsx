import { BaseModal } from "@shared/ui/modals";
import type { EntityType } from "@shared/config/types";
import { useTranslation } from "react-i18next";
import {
  FeedbackForm,
  useFeedbackForm,
} from "@features/feedback/modal-feedback";

interface CreateFeedbackModalProps {
  entityType: EntityType;
  entityId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateFeedbackModal = ({
  entityType,
  entityId,
  isOpen,
  onClose,
}: CreateFeedbackModalProps) => {
  const { t } = useTranslation(["feedback"]);

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { formik, mutation, isLoading } = useFeedbackForm({
    entityType,
    entityId,
    onSuccess: handleClose,
  });

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} maxWidth="640px">
      <FeedbackForm
        formik={formik}
        isLoading={isLoading}
        buttonText={t("feedback:actions.submit")}
        entityType={entityType}
      />
    </BaseModal>
  );
};

import { BaseModal } from "@shared/ui/modals";
import type { EntityType } from "@shared/config/types";
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
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="640px">
      <FeedbackForm
        formik={formik}
        isLoading={isLoading}
        buttonText="Submit Feedback"
      />
    </BaseModal>
  );
};

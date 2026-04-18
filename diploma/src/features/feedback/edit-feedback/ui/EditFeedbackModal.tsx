import { BaseModal } from "@shared/ui/modals";
import type { EntityType } from "@shared/config/types";
import {
  FeedbackForm,
  useFeedbackForm,
} from "@features/feedback/modal-feedback";
import type { Feedback } from "@entities/feedback/model";

interface EditFeedbackModalProps {
  entityType: EntityType;
  entityId: string;
  isOpen: boolean;
  onClose: () => void;
  feedback: Pick<Feedback, "id" | "comment" | "rating">;
}

export const EditFeedbackModal = ({
  entityType,
  entityId,
  isOpen,
  onClose,
  feedback,
}: EditFeedbackModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };
  const { formik, isLoading, mutation } = useFeedbackForm({
    entityType,
    entityId,
    initialValues: {
      id: feedback.id,
      rating: feedback.rating,
      comment: feedback.comment ?? "",
    },
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
